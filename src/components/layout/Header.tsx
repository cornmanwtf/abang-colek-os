import { useRef } from "react";
import type { SearchResult } from "../../lib/search";
import { importJson } from "../../lib/importers";
import type { BrandOSData } from "../../types";

interface HeaderProps {
  isSaving: boolean;
  lastSavedAt: number | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  onSearchNavigate: (result: SearchResult) => void;
  onReset: () => void;
  onHardReset: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onImportData: (data: BrandOSData) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

const formatTimestamp = (timestamp: number | null) => {
  if (!timestamp) return "Never";
  return new Date(timestamp).toLocaleTimeString();
};

export function Header({
  isSaving,
  lastSavedAt,
  searchQuery,
  setSearchQuery,
  searchResults,
  onSearchNavigate,
  onReset,
  onHardReset,
  isDarkMode,
  onToggleDarkMode,
  onImportData,
  searchInputRef,
}: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importJson(file);
    if (result.success && result.data) {
      onImportData(result.data);
    } else {
      alert(result.error ?? "Import failed");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <header className="bg-[#111111] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">Abang Colek Brand OS</h1>
          <div className="rounded-full bg-[#1f1f1f] px-3 py-1 text-xs uppercase tracking-wide text-[#f7b500]">
            {isSaving ? "Saving..." : "Saved"} ·{" "}
            <span className="text-white">
              {formatTimestamp(lastSavedAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search (Ctrl+K)"
              className="w-full rounded-md border border-[#333] bg-[#1f1f1f] px-3 py-2 text-sm text-white placeholder:text-[#9ca3af] focus:border-[#f7b500] focus:outline-none"
            />
            {searchQuery && (
              <div className="absolute left-0 top-11 z-20 w-full rounded-md border border-black/10 bg-white shadow-lg">
                <div className="max-h-64 overflow-y-auto p-2 text-sm">
                  {searchResults.length === 0 && (
                    <div className="px-2 py-3 text-black/60">
                      No matches yet.
                    </div>
                  )}
                  {searchResults.map((result) => (
                    <button
                      key={`${result.tab}-${result.id}`}
                      onClick={() => onSearchNavigate(result)}
                      className="w-full rounded-md px-2 py-2 text-left hover:bg-[#fff3c4]"
                    >
                      <div className="text-xs uppercase tracking-wide text-[#e53935]">
                        {result.tab}
                      </div>
                      <div className="font-medium text-black">
                        {result.label}
                      </div>
                      <div className="text-xs text-black/60">
                        {result.snippet}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onToggleDarkMode}
              className="rounded-md border border-[#444] bg-[#1f1f1f] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#f7b500] hover:border-[#f7b500]"
              title="Toggle dark mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleImportClick}
              className="rounded-md border border-[#444] bg-[#1f1f1f] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#f7b500] hover:border-[#f7b500]"
            >
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Import JSON file"
            />
            <button
              onClick={onReset}
              className="rounded-md border border-[#444] bg-[#1f1f1f] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#f7b500] hover:border-[#f7b500]"
            >
              Reset
            </button>
            <button
              onClick={onHardReset}
              className="rounded-md border border-[#e53935] bg-[#e53935] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#d32f2f]"
            >
              Hard Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
