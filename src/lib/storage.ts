import type { BrandOSData } from "../types";

export const STORAGE_KEY = "abangColekBrandOS:v2";

type StoredPayload = {
  version: 2;
  updatedAt: number;
  data: BrandOSData;
};

type LoadResult = {
  data: BrandOSData;
  updatedAt: number | null;
  warning: string | null;
};

const isValidData = (data: BrandOSData): boolean => {
  if (!data) return false;
  if (!Array.isArray(data.deck)) return false;
  if (!Array.isArray(data.song)) return false;
  if (!Array.isArray(data.sop)) return false;
  if (!Array.isArray(data.manifesto)) return false;
  if (!Array.isArray(data.events)) return false;
  if (!Array.isArray(data.boothChecklists)) return false;
  if (!Array.isArray(data.hooks)) return false;
  if (!Array.isArray(data.contentPlans)) return false;
  if (!Array.isArray(data.postEventReviews)) return false;
  if (!data.tagline) return false;
  return true;
};

const normalizeData = (data: Partial<BrandOSData>, fallback: BrandOSData): BrandOSData => ({
  deck: Array.isArray(data.deck) ? data.deck : fallback.deck,
  song: Array.isArray(data.song) ? data.song : fallback.song,
  sop: Array.isArray(data.sop) ? data.sop : fallback.sop,
  tagline: data.tagline ?? fallback.tagline,
  manifesto: Array.isArray(data.manifesto) ? data.manifesto : fallback.manifesto,
  events: Array.isArray(data.events) ? data.events : fallback.events,
  boothChecklists: Array.isArray(data.boothChecklists) ? data.boothChecklists : fallback.boothChecklists,
  hooks: Array.isArray(data.hooks) ? data.hooks : fallback.hooks,
  contentPlans: Array.isArray(data.contentPlans) ? data.contentPlans : fallback.contentPlans,
  postEventReviews: Array.isArray(data.postEventReviews)
    ? data.postEventReviews
    : fallback.postEventReviews,
});

export const loadBrandData = (fallback: BrandOSData): LoadResult => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return {
      data: fallback,
      updatedAt: null,
      warning: "Local storage unavailable. Loaded preset instead.",
    };
  }
  if (!raw) return { data: fallback, updatedAt: null, warning: null };

  try {
    const parsed = JSON.parse(raw) as StoredPayload | { version: 1; updatedAt: number; data: Partial<BrandOSData> };
    if (!parsed || !parsed.data) {
      return {
        data: fallback,
        updatedAt: null,
        warning: "Stored data was incompatible. Loaded preset instead.",
      };
    }
    const normalized = normalizeData(parsed.data, fallback);
    if (!isValidData(normalized)) {
      return {
        data: fallback,
        updatedAt: null,
        warning: "Stored data was corrupted. Loaded preset instead.",
      };
    }
    return {
      data: normalized,
      updatedAt: (parsed.updatedAt ?? null) as number | null,
      warning: parsed.version === 1 ? "Stored data upgraded to the latest version." : null,
    };
  } catch {
    return {
      data: fallback,
      updatedAt: null,
      warning: "Stored data was unreadable. Loaded preset instead.",
    };
  }
};

export const saveBrandData = (data: BrandOSData): number => {
  const updatedAt = Date.now();
  const payload: StoredPayload = {
    version: 2,
    updatedAt,
    data,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    return updatedAt;
  }
  return updatedAt;
};

export const clearBrandData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
