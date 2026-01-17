/**
 * Supabase Sync Service
 * 
 * Provides hybrid localStorage + Supabase cloud storage with:
 * - Automatic sync to cloud when online
 * - Conflict resolution (cloud wins if newer)
 * - Offline-first with sync queue
 */

import { supabase } from './supabase';
import type { BrandOSData } from '../types';

// Sync status for UI feedback
export type SyncStatus =
    | 'idle'
    | 'syncing'
    | 'synced'
    | 'offline'
    | 'error';

export type SyncResult = {
    success: boolean;
    status: SyncStatus;
    message: string;
    timestamp?: number;
};

// Table name in Supabase
const TABLE_NAME = 'brand_data';
const USER_ID = 'default_user'; // For single-user, can be extended for multi-user

/**
 * Save data to Supabase cloud
 */
export const syncToCloud = async (data: BrandOSData): Promise<SyncResult> => {
    try {
        const payload = {
            user_id: USER_ID,
            data: data,
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from(TABLE_NAME)
            .upsert(payload, { onConflict: 'user_id' });

        if (error) {
            console.error('Supabase sync error:', error);
            return {
                success: false,
                status: 'error',
                message: `Sync failed: ${error.message}`,
            };
        }

        return {
            success: true,
            status: 'synced',
            message: 'Data synced to cloud',
            timestamp: Date.now(),
        };
    } catch (err) {
        console.error('Sync to cloud failed:', err);
        return {
            success: false,
            status: 'offline',
            message: 'Network error - will retry when online',
        };
    }
};

/**
 * Load data from Supabase cloud
 */
export const loadFromCloud = async (): Promise<{
    data: BrandOSData | null;
    updatedAt: string | null;
    error: string | null;
}> => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('data, updated_at')
            .eq('user_id', USER_ID)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No data found - this is OK for new users
                return { data: null, updatedAt: null, error: null };
            }
            console.error('Supabase load error:', error);
            return { data: null, updatedAt: null, error: error.message };
        }

        return {
            data: data?.data as BrandOSData | null,
            updatedAt: data?.updated_at ?? null,
            error: null,
        };
    } catch (err) {
        console.error('Load from cloud failed:', err);
        return {
            data: null,
            updatedAt: null,
            error: 'Network error - using local data',
        };
    }
};

/**
 * Check if cloud data is newer than local data
 */
export const isCloudNewer = (
    localUpdatedAt: number | null,
    cloudUpdatedAt: string | null
): boolean => {
    if (!cloudUpdatedAt) return false;
    if (!localUpdatedAt) return true;

    const cloudTime = new Date(cloudUpdatedAt).getTime();
    return cloudTime > localUpdatedAt;
};

/**
 * Merge local and cloud data with conflict resolution
 * Strategy: Cloud wins if newer, otherwise local wins
 */
export const resolveConflict = async (
    localData: BrandOSData,
    localUpdatedAt: number | null
): Promise<{
    data: BrandOSData;
    source: 'local' | 'cloud';
    message: string;
}> => {
    const cloudResult = await loadFromCloud();

    if (cloudResult.error || !cloudResult.data) {
        return {
            data: localData,
            source: 'local',
            message: cloudResult.error ?? 'No cloud data found',
        };
    }

    if (isCloudNewer(localUpdatedAt, cloudResult.updatedAt)) {
        return {
            data: cloudResult.data,
            source: 'cloud',
            message: 'Loaded newer data from cloud',
        };
    }

    return {
        data: localData,
        source: 'local',
        message: 'Local data is up to date',
    };
};

/**
 * Full sync: Load from cloud, merge, save back
 */
export const fullSync = async (
    localData: BrandOSData,
    localUpdatedAt: number | null
): Promise<SyncResult & { data?: BrandOSData }> => {
    // First, resolve any conflicts
    const resolved = await resolveConflict(localData, localUpdatedAt);

    // If we got cloud data, use it
    if (resolved.source === 'cloud') {
        return {
            success: true,
            status: 'synced',
            message: resolved.message,
            data: resolved.data,
            timestamp: Date.now(),
        };
    }

    // Otherwise, push local to cloud
    const syncResult = await syncToCloud(localData);
    return {
        ...syncResult,
        data: localData,
    };
};
