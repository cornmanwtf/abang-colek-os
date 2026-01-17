import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { presetData } from "../preset";
import { loadBrandData, saveBrandData, clearBrandData } from "../lib/storage";
import { syncToCloud, loadFromCloud } from "../lib/sync";
import type { SyncStatus } from "../lib/sync";
import type { BrandOSData, ManifestoVariant } from "../types";

const AUTOSAVE_DEBOUNCE_MS = 500;
const CLOUD_SYNC_DEBOUNCE_MS = 5000; // Sync to cloud every 5s after changes

interface BrandContextType {
    data: BrandOSData;
    setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
    warning: string | null;
    lastSavedAt: number | null;
    isSaving: boolean;
    syncStatus: SyncStatus;
    triggerSync: () => Promise<void>;
    resetData: () => void;
    hardResetData: () => void;
    importData: (data: BrandOSData) => void;
    addManifesto: () => void;
    removeManifesto: (id: string, nextIdFallback: (id: string) => void) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
    const loaded = useMemo(() => loadBrandData(presetData), []);
    const [data, setData] = useState<BrandOSData>(loaded.data);
    const [warning, setWarning] = useState<string | null>(loaded.warning);
    const [lastSavedAt, setLastSavedAt] = useState<number | null>(loaded.updatedAt);
    const [isSaving, setIsSaving] = useState(false);
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

    const isFirstLoad = useRef(true);
    const saveTimer = useRef<number | null>(null);
    const cloudSyncTimer = useRef<number | null>(null);

    // Cloud sync function
    const triggerSync = async () => {
        setSyncStatus('syncing');
        const result = await syncToCloud(data);
        setSyncStatus(result.status);
    };

    // Load from cloud on initial load (optional enhancement)
    useEffect(() => {
        const checkCloud = async () => {
            const cloudData = await loadFromCloud();
            if (cloudData.data && cloudData.updatedAt) {
                const cloudTime = new Date(cloudData.updatedAt).getTime();
                if (!lastSavedAt || cloudTime > lastSavedAt) {
                    setData(cloudData.data);
                    setLastSavedAt(cloudTime);
                    setSyncStatus('synced');
                }
            }
        };
        checkCloud();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    // Autosave logic with cloud sync
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        // Indicate saving start
        setIsSaving(true);

        if (saveTimer.current) {
            window.clearTimeout(saveTimer.current);
        }

        saveTimer.current = window.setTimeout(() => {
            const savedAt = saveBrandData(data);
            setLastSavedAt(savedAt);
            setIsSaving(false);
        }, AUTOSAVE_DEBOUNCE_MS);

        // Schedule cloud sync (debounced longer)
        if (cloudSyncTimer.current) {
            window.clearTimeout(cloudSyncTimer.current);
        }

        cloudSyncTimer.current = window.setTimeout(() => {
            triggerSync();
        }, CLOUD_SYNC_DEBOUNCE_MS);

        return () => {
            if (saveTimer.current) {
                window.clearTimeout(saveTimer.current);
            }
            if (cloudSyncTimer.current) {
                window.clearTimeout(cloudSyncTimer.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const resetData = () => {
        setData(presetData);
        setWarning(null);
    };

    const hardResetData = () => {
        clearBrandData();
        setData(presetData);
        setWarning(null);
        setLastSavedAt(null);
    };

    const importData = (importedData: BrandOSData) => {
        setData(importedData);
        setWarning(null);
    };

    const addManifesto = () => {
        setData((prev) => {
            const next: ManifestoVariant = {
                id: `manifesto-${Date.now()}`,
                title: `Variant ${prev.manifesto.length + 1}`,
                content: "",
            };
            return { ...prev, manifesto: [...prev.manifesto, next] };
        });
    };

    const removeManifesto = (id: string, nextIdFallback: (id: string) => void) => {
        setData((prev) => {
            const filtered = prev.manifesto.filter((variant) => variant.id !== id);
            const nextId = filtered[0]?.id ?? "tagline";
            nextIdFallback(nextId);
            return { ...prev, manifesto: filtered };
        });
    };

    return (
        <BrandContext.Provider
            value={{
                data,
                setData,
                warning,
                lastSavedAt,
                isSaving,
                syncStatus,
                triggerSync,
                resetData,
                hardResetData,
                importData,
                addManifesto,
                removeManifesto,
            }}
        >
            {children}
        </BrandContext.Provider>
    );
}

export function useBrand() {
    const context = useContext(BrandContext);
    if (context === undefined) {
        throw new Error("useBrand must be used within a BrandProvider");
    }
    return context;
}
