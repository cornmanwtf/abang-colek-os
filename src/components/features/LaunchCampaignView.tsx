import { useState } from "react";
import type { BrandOSData } from "../../types";

interface LaunchCampaignViewProps {
    data: BrandOSData;
    setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
}

export function LaunchCampaignView({ data, setData }: LaunchCampaignViewProps) {
    const [activeTab, setActiveTab] = useState<"TEASER" | "LANDING">("TEASER");

    // Silence unused vars for prototype
    void data;
    void setData;

    // Mock Teaser Data
    const [teasers, setTeasers] = useState([
        { id: 1, day: "Day -7", title: "The Mistake", status: "Done" },
        { id: 2, day: "Day -5", title: "Ingredient Reveal", status: "Done" },
        { id: 3, day: "Day -3", title: "Packaging Tease", status: "Planned" },
        { id: 4, day: "Day -1", title: "Manifesto Drop", status: "Planned" },
        { id: 5, day: "Launch", title: "We Are Live", status: "Planned" },
    ]);

    // Mock Landing Page Config
    const [headline, setHeadline] = useState("SOMETHING SPICY IS COMING");
    const [email, setEmail] = useState("");

    const toggleTeaser = (id: number) => {
        setTeasers(prev => prev.map(t =>
            t.id === id ? { ...t, status: t.status === "Done" ? "Planned" : "Done" } : t
        ));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-black">Launch Campaign</h2>
                    <p className="text-sm text-black/50">Manage pre-launch content and landing page.</p>
                </div>
                <div className="flex bg-white rounded-lg border border-black/10 p-1">
                    {["TEASER", "LANDING"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 text-xs font-bold uppercase rounded ${activeTab === tab ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === "TEASER" && (
                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                    <div className="p-6 border-b border-black/5">
                        <h3 className="font-heading font-bold text-lg">Teaser Content Series</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {teasers.map(t => (
                            <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-12 rounded-full ${t.status === "Done" ? "bg-brand-green" : "bg-gray-200"}`} />
                                    <div>
                                        <div className="text-xs font-bold uppercase text-black/40">{t.day}</div>
                                        <div className="font-semibold text-brand-black">{t.title}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleTeaser(t.id)}
                                    className={`px-3 py-1 text-xs font-bold uppercase rounded border ${t.status === "Done"
                                        ? "bg-green-100 text-green-700 border-green-200"
                                        : "bg-gray-100 text-gray-500 border-gray-200"
                                        }`}
                                >
                                    {t.status}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "LANDING" && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Config Panel */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 h-fit">
                        <h3 className="font-heading font-bold text-lg mb-6">Page Config</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Headline</label>
                                <input
                                    value={headline}
                                    onChange={e => setHeadline(e.target.value)}
                                    className="w-full bg-gray-50 border border-black/10 rounded px-4 py-2 font-bold focus:outline-none focus:border-brand-gold"
                                    placeholder="Enter headline..."
                                />
                            </div>
                            <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded border border-blue-100">
                                <strong>Preview Mode:</strong> This is how the "Coming Soon" page will look to visitors.
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="relative aspect-[9/16] md:aspect-[3/4] bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800 flex flex-col items-center justify-center text-center p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />

                        {/* Neon Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/20 blur-[100px] rounded-full z-0" />

                        <div className="relative z-10 space-y-8 w-full max-w-sm">
                            <div className="w-16 h-16 bg-white mx-auto rounded-full flex items-center justify-center font-bold text-2xl font-heading tracking-tight border-2 border-brand-red">
                                AC
                            </div>

                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                {headline}
                            </h1>

                            <p className="text-gray-400 text-sm font-medium">
                                The ultimate sambal experience is just around the corner.
                            </p>

                            <div className="space-y-3">
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-center font-medium focus:outline-none focus:border-brand-red transition-all"
                                />
                                <button className="w-full bg-brand-red text-white font-bold uppercase py-3 rounded-lg shadow-[0_0_20px_rgba(229,57,53,0.4)] hover:shadow-[0_0_30px_rgba(229,57,53,0.6)] hover:brightness-110 transition-all">
                                    Notify Me
                                </button>
                            </div>

                            <div className="pt-8 text-white/20 text-xs tracking-widest uppercase">
                                Est. 2026
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
