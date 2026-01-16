import type { BrandOSData } from "../types";

export type SearchResult = {
  id: string;
  tab: "Deck" | "Song" | "SOP" | "Manifesto";
  label: string;
  snippet: string;
};

const snippetFrom = (text: string, query: string): string => {
  const lower = text.toLowerCase();
  const index = lower.indexOf(query.toLowerCase());
  if (index === -1) {
    return text.slice(0, 80);
  }
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + 50);
  return text.slice(start, end).replace(/\n/g, " ");
};

export const searchData = (data: BrandOSData, query: string): SearchResult[] => {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const results: SearchResult[] = [];

  data.deck.forEach((slide, index) => {
    const haystack = `${slide.title}\n${slide.body}`;
    if (haystack.toLowerCase().includes(trimmed.toLowerCase())) {
      results.push({
        id: slide.id,
        tab: "Deck",
        label: `Slide ${index + 1}: ${slide.title}`,
        snippet: snippetFrom(haystack, trimmed),
      });
    }
  });

  data.song.forEach((section) => {
    const haystack = `${section.title}\n${section.content}`;
    if (haystack.toLowerCase().includes(trimmed.toLowerCase())) {
      results.push({
        id: section.id,
        tab: "Song",
        label: section.title,
        snippet: snippetFrom(haystack, trimmed),
      });
    }
  });

  data.sop.forEach((item) => {
    const haystack = `${item.title}\n${item.content}`;
    if (haystack.toLowerCase().includes(trimmed.toLowerCase())) {
      results.push({
        id: item.id,
        tab: "SOP",
        label: item.title,
        snippet: snippetFrom(haystack, trimmed),
      });
    }
  });

  data.manifesto.forEach((variant) => {
    const haystack = `${variant.title}\n${variant.content}`;
    if (haystack.toLowerCase().includes(trimmed.toLowerCase())) {
      results.push({
        id: variant.id,
        tab: "Manifesto",
        label: variant.title,
        snippet: snippetFrom(haystack, trimmed),
      });
    }
  });

  const taglineText = `${data.tagline.primary}\n${data.tagline.alternatives.join(
    "\n"
  )}`;
  if (taglineText.toLowerCase().includes(trimmed.toLowerCase())) {
    results.push({
      id: "tagline",
      tab: "Manifesto",
      label: "Tagline",
      snippet: snippetFrom(taglineText, trimmed),
    });
  }

  return results;
};
