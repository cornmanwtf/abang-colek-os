import type { BrandOSData } from "../types";

type ImportResult = {
    success: boolean;
    data: BrandOSData | null;
    error: string | null;
};

const isValidData = (data: unknown): data is BrandOSData => {
    if (!data || typeof data !== "object") return false;
    const d = data as Record<string, unknown>;
    if (!Array.isArray(d.deck)) return false;
    if (!Array.isArray(d.song)) return false;
    if (!Array.isArray(d.sop)) return false;
    if (!Array.isArray(d.manifesto)) return false;
    if (!d.tagline || typeof d.tagline !== "object") return false;
    return true;
};

export const importJson = (file: File): Promise<ImportResult> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const content = event.target?.result;
                if (typeof content !== "string") {
                    resolve({ success: false, data: null, error: "Could not read file" });
                    return;
                }

                const parsed = JSON.parse(content);
                const data = parsed.data ?? parsed;

                if (!isValidData(data)) {
                    resolve({ success: false, data: null, error: "Invalid data format" });
                    return;
                }

                resolve({ success: true, data, error: null });
            } catch {
                resolve({ success: false, data: null, error: "Invalid JSON file" });
            }
        };

        reader.onerror = () => {
            resolve({ success: false, data: null, error: "Failed to read file" });
        };

        reader.readAsText(file);
    });
};
