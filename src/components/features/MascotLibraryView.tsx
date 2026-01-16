
interface MascotAsset {
    id: string;
    name: string;
    description: string;
    url: string; // Placeholder or actual URL
    type: "PNG" | "VECTOR" | "ANIMATION";
}

const MASCOT_ASSETS: MascotAsset[] = [
    { id: "1", name: "Abang Colek - Thumbs Up", description: "Standard posing for success/approval.", url: "👍", type: "PNG" },
    { id: "2", name: "Abang Colek - Cooking", description: "Action shot with frying pan.", url: "🍳", type: "PNG" },
    { id: "3", name: "Abang Colek - Shocked", description: "For viral hook reactions.", url: "😱", type: "PNG" },
    { id: "4", name: "Abang Colek - Holding Cash", description: "For sales/profit posts.", url: "💰", type: "PNG" },
    { id: "5", name: "Logo - Full Vertical", description: "Standard brand logo.", url: "🔥", type: "VECTOR" },
];

export function MascotLibraryView() {

    const handleCopy = (id: string) => {
        // In real app, copies URL. Here we alert.
        alert(`Asset ID ${id} copied to clipboard!`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-black">Brand Assets</h2>
                    <p className="text-sm text-black/50">Official Abang Colek digital asset library.</p>
                </div>
                <button className="bg-brand-black text-white px-4 py-2 rounded font-bold text-sm uppercase">
                    Upload New
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {MASCOT_ASSETS.map(asset => (
                    <div key={asset.id} className="bg-white rounded-xl border border-black/10 overflow-hidden group hover:shadow-lg transition-all">
                        <div className="aspect-square bg-gray-50 flex items-center justify-center text-6xl">
                            {asset.url}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-brand-black text-sm">{asset.name}</h3>
                                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-bold text-gray-500">{asset.type}</span>
                            </div>
                            <p className="text-xs text-black/50 mb-3 line-clamp-2">{asset.description}</p>
                            <button
                                onClick={() => handleCopy(asset.id)}
                                className="w-full border border-black/10 rounded py-1.5 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
                            >
                                Copy Asset Link
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
