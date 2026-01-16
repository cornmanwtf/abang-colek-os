import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { presetData } from "../preset";
import { loadBrandData, saveBrandData, clearBrandData } from "../lib/storage";
import type { BrandOSData, ManifestoVariant } from "../types";

const AUTOSAVE_DEBOUNCE_MS = 500;

interface BrandContextType {
    data: BrandOSData;
    setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
    warning: string | null;
    lastSavedAt: number | null;
    isSaving: boolean;
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

    const isFirstLoad = useRef(true);
    const saveTimer = useRef<number | null>(null);

    // Autosave logic
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        // Indicate saving start
        setIsSaving(true); // Direct update is safe here compared to App.tsx complexity

        if (saveTimer.current) {
            window.clearTimeout(saveTimer.current);
        }

        saveTimer.current = window.setTimeout(() => {
            const savedAt = saveBrandData(data);
            setLastSavedAt(savedAt);
            setIsSaving(false);
        }, AUTOSAVE_DEBOUNCE_MS);

        return () => {
            if (saveTimer.current) {
                window.clearTimeout(saveTimer.current);
            }
        };
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
