import { useState } from "react";
import QRCode from "react-qr-code";
import confetti from "canvas-confetti";
import type { BrandOSData, Participant } from "../../types";

interface LuckyDrawViewProps {
    data: BrandOSData;
    setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
}

export function LuckyDrawView({ data, setData }: LuckyDrawViewProps) {
    const [activeTab, setActiveTab] = useState<"QR" | "DRAW" | "LIST">("DRAW");
    const [newParticipant, setNewParticipant] = useState({ name: "", phone: "" });
    const [winner, setWinner] = useState<Participant | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const participants = data.participants || [];

    const handleAddParticipant = () => {
        if (!newParticipant.name || !newParticipant.phone) return;
        const p: Participant = {
            id: `p-${Date.now()}`,
            name: newParticipant.name,
            phone: newParticipant.phone,
            campaignId: "camp-default",
            createdAt: new Date().toISOString()
        };
        setData(prev => ({ ...prev, participants: [...(prev.participants || []), p] }));
        setNewParticipant({ name: "", phone: "" });
    };

    const drawWinner = () => {
        if (participants.length === 0) return;
        setIsSpinning(true);
        setWinner(null);

        // Mock spinning effect
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * participants.length);
            const selected = participants[randomIndex];
            setWinner(selected);
            setIsSpinning(false);

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-black">Lucky Draw System</h2>
                </div>
                <div className="flex bg-white rounded-lg border border-black/10 p-1">
                    {["DRAW", "QR", "LIST"].map(tab => (
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

            {activeTab === 'DRAW' && (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-black/10 min-h-[400px]">
                    {isSpinning ? (
                        <div className="text-4xl font-heading font-bold animate-pulse text-brand-gold">
                            SPINNING...
                        </div>
                    ) : winner ? (
                        <div className="text-center animate-bounce">
                            <div className="text-sm font-bold uppercase text-black/50 mb-2">WINNER</div>
                            <div className="text-6xl font-heading font-bold text-brand-red mb-4">{winner.name}</div>
                            <div className="text-xl font-mono text-black/60">{winner.phone}</div>
                            <button onClick={() => setWinner(null)} className="mt-8 text-xs font-bold underline text-black/40 hover:text-black">Reset</button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-8xl font-heading font-bold text-black/10 mb-8">?</div>
                            <button
                                onClick={drawWinner}
                                disabled={participants.length === 0}
                                className="bg-brand-red text-white text-xl font-heading font-bold py-4 px-12 rounded-full shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                DRAW WINNER
                            </button>
                            <div className="mt-4 text-sm font-bold text-black/40">{participants.length} Participants Entried</div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'QR' && (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl border border-black/10 flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-black/5 mb-6">
                            <QRCode value="https://abangcolek.com/join" size={256} />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-brand-black mb-2">Scan to Join</h3>
                        <p className="text-black/60">stand a chance to win exclusive merch!</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-black/10">
                        <h3 className="font-heading font-bold text-lg mb-6">Manual Entry</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Name</label>
                                <input
                                    value={newParticipant.name}
                                    onChange={e => setNewParticipant(p => ({ ...p, name: e.target.value }))}
                                    className="w-full bg-gray-50 border border-black/10 rounded px-4 py-2 font-bold focus:outline-none focus:border-brand-gold"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Phone</label>
                                <input
                                    value={newParticipant.phone}
                                    onChange={e => setNewParticipant(p => ({ ...p, phone: e.target.value }))}
                                    className="w-full bg-gray-50 border border-black/10 rounded px-4 py-2 font-bold focus:outline-none focus:border-brand-gold"
                                    placeholder="+60..."
                                />
                            </div>
                            <button
                                onClick={handleAddParticipant}
                                className="w-full bg-brand-black text-white font-bold uppercase py-3 rounded hover:bg-black/80"
                            >
                                Add Participant
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'LIST' && (
                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-black/50 uppercase text-xs border-b border-black/5">
                            <tr>
                                <th className="px-6 py-3 font-bold">Name</th>
                                <th className="px-6 py-3 font-bold">Phone</th>
                                <th className="px-6 py-3 font-bold">Joined At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {participants.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-bold text-brand-black">{p.name}</td>
                                    <td className="px-6 py-3 text-gray-600">{p.phone}</td>
                                    <td className="px-6 py-3 text-black/40 text-xs">{new Date(p.createdAt).toLocaleDateString()} {new Date(p.createdAt).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                            {participants.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400 italic">No participants yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
