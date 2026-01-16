import type { Tab } from "../layout/Sidebar";

interface LivePreviewProps {
    activeTab: Tab;
    activeTitle: string;
    activeContent: string;
}

export function LivePreview({
    activeTab,
    activeTitle,
    activeContent,
}: LivePreviewProps) {
    if (activeTab === "Exports") return null;

    return (
        <section className="rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
                Preview
            </div>
            <div className="space-y-3 rounded-lg border border-black/5 bg-[#fff3c4] p-4">
                <div className="text-lg font-semibold text-black">
                    {activeTitle}
                </div>
                <div className="whitespace-pre-wrap text-sm text-black/70">
                    {activeContent}
                </div>
            </div>
        </section>
    );
}
