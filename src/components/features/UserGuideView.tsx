import { useState } from "react";
import type { BrandOSData } from "../../types";

interface UserGuideViewProps {
    data: BrandOSData;
}

export function UserGuideView({ data }: UserGuideViewProps) {
    const [activeTab, setActiveTab] = useState<"PIPELINE" | "BOOTH" | "MARKETING" | "ADMIN">("PIPELINE");

    // Silence unused var
    void data;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-black">User Guide</h2>
                    <p className="text-sm text-black/50">Official Abang Colek Brand OS Manual.</p>
                </div>
                <div className="flex bg-white rounded-lg border border-black/10 p-1">
                    {["PIPELINE", "BOOTH", "MARKETING", "ADMIN"].map(tab => (
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

            <div className="bg-white rounded-xl border border-black/10 p-8 min-h-[400px]">
                {activeTab === "PIPELINE" && (
                    <div className="prose max-w-none">
                        <h3 className="font-heading font-bold text-xl mb-4">Event Pipeline Guide</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">Creating an Event</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-black/70">
                                    <li>Navigate to the <strong>Events</strong> tab.</li>
                                    <li>Click <strong>New Event</strong>.</li>
                                    <li>Fill in the mandatory details: Title, Date, Region, and Status.</li>
                                    <li>Use the "Logistics" section to calculate travel costs automatically based on distance.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">Managing Financials</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-black/70">
                                    <li>Open an event and modify the <strong>P&L</strong> section.</li>
                                    <li>Use the <strong>Dashboard</strong> to view aggregated revenue and profit margins.</li>
                                    <li>Invoices can be generated automatically from the event details.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "BOOTH" && (
                    <div className="prose max-w-none">
                        <h3 className="font-heading font-bold text-xl mb-4">Booth Operations SOP</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">Opening Checklist</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-black/70">
                                    <li>Staff Arrive (wear full uniform).</li>
                                    <li>Stall Setup (Tables, Banner, POS).</li>
                                    <li>Equipment Check (Gas, Stove, Fryer).</li>
                                    <li>Stock Count (Record in Inventory Tracker).</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">Using POS</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-black/70">
                                    <li>Navigate to <strong>Booth</strong> tab.</li>
                                    <li>Tap items to add to cart.</li>
                                    <li>Select Payment Method (Cash/QR).</li>
                                    <li>Click "Complete Order" to print receipt (simulated).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "MARKETING" && (
                    <div className="prose max-w-none">
                        <h3 className="font-heading font-bold text-xl mb-4">Marketing Tools</h3>
                        <p className="mb-4 text-sm text-black/70">Use these tools to engage customers and create content.</p>

                        <div className="space-y-6">
                            <div className="border hover:border-brand-gold p-4 rounded-lg transition-colors">
                                <h4 className="font-bold">Lucky Draw System</h4>
                                <p className="text-sm text-black/60">
                                    1. Open <strong>Marketing &gt; Lucky Draw</strong>.<br />
                                    2. Show QR code to customers to join.<br />
                                    3. Go to "DRAW" tab and click the button to pick a winner live.
                                </p>
                            </div>
                            <div className="border hover:border-brand-gold p-4 rounded-lg transition-colors">
                                <h4 className="font-bold">Launch Campaign</h4>
                                <p className="text-sm text-black/60">
                                    1. Open <strong>Launch</strong> tab.<br />
                                    2. Track teaser content daily.<br />
                                    3. Preview the "Coming Soon" page before going live.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "ADMIN" && (
                    <div className="prose max-w-none">
                        <h3 className="font-heading font-bold text-xl mb-4">Admin Controls</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">WOCS Bots</h4>
                                <p className="text-sm text-black/70 mb-2">Your automated assistants:</p>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-black/70">
                                    <li><strong>Admin Bot</strong>: Daily reports & reminders.</li>
                                    <li><strong>Content Bot</strong>: Trend alerts & caption drafting.</li>
                                    <li><strong>Analytics Bot</strong>: Weekly sales analysis.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-black mb-2">Data Management</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-black/70">
                                    <li>Use Header Controls to <strong>Save</strong> or <strong>Reset</strong> data.</li>
                                    <li>Import/Export JSON backups regularly.</li>
                                    <li>Toggle <strong>Dark Mode</strong> for night events.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
