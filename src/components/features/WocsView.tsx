import { useState, useEffect } from "react";
import type { BrandOSData } from "../../types";

interface WocsViewProps {
    data: BrandOSData;
}

type AgentType = "ADMIN" | "CONTENT" | "ANALYTICS";

interface AgentLog {
    id: string;
    timestamp: string;
    agent: AgentType;
    message: string;
    type: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
}

const MOCK_LOGS: AgentLog[] = [
    { id: "1", timestamp: new Date(Date.now() - 100000).toISOString(), agent: "ADMIN", message: "System initialized. WOCS v1.0 online.", type: "INFO" },
    { id: "2", timestamp: new Date(Date.now() - 80000).toISOString(), agent: "CONTENT", message: "Scanned TikTok trends. Found 3 new hooks.", type: "SUCCESS" },
    { id: "3", timestamp: new Date(Date.now() - 60000).toISOString(), agent: "ANALYTICS", message: "Weekly report generated. Profit margin stable at 35%.", type: "INFO" },
];

export function WocsView({ data }: WocsViewProps) {
    const [activeAgent, setActiveAgent] = useState<AgentType | "ALL">("ALL");
    const [logs, setLogs] = useState<AgentLog[]>(MOCK_LOGS);
    const [isProcessing, setIsProcessing] = useState(false);

    const addLog = (agent: AgentType, message: string, type: "INFO" | "WARNING" | "SUCCESS" | "ERROR" = "INFO") => {
        const newLog: AgentLog = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            agent,
            message,
            type
        };
        setLogs(prev => [newLog, ...prev]);
    };

    const handleRunTask = (agent: AgentType, taskName: string) => {
        if (isProcessing) return;
        setIsProcessing(true);
        addLog(agent, `Starting task: ${taskName}...`, "INFO");

        setTimeout(() => {
            let resultMsg = "Task completed successfully.";
            if (taskName === "Generate Daily Report") resultMsg = "Report generated and sent to WhatsApp Group: 'Abang Colek HQ'.";
            if (taskName === "Scan Viral Sounds") resultMsg = "Found 5 trending sounds. Added to Hook Bank.";
            if (taskName === "Forecast Inventory") resultMsg = "Warning: 'Sosej Jumbo' stock low for upcoming weekend events.";

            addLog(agent, resultMsg, taskName.includes("Forecast") ? "WARNING" : "SUCCESS");
            setIsProcessing(false);
        }, 2000);
    };

    const filteredLogs = activeAgent === "ALL" ? logs : logs.filter(l => l.agent === activeAgent);

    return (
        <section className="bg-white rounded-xl border border-black/10 overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="bg-brand-black text-white p-6 flex justify-between items-start">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-green-400 animate-pulse">● System Online</div>
                    <h2 className="text-2xl font-heading font-bold leading-none mt-2">W.O.C.S</h2>
                    <p className="text-white/60 text-xs mt-1">WhatsApp Ops Control System</p>
                </div>
                <div className="flex bg-white/10 rounded-lg p-1">
                    {(["ALL", "ADMIN", "CONTENT", "ANALYTICS"] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveAgent(tab)}
                            className={`px-4 py-2 text-xs font-bold uppercase rounded ${activeAgent === tab ? "bg-white text-brand-black" : "text-white/60 hover:bg-white/20"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Controls Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-black/5 p-4 overflow-y-auto space-y-6">

                    {/* Admin Bot Params */}
                    {(activeAgent === "ALL" || activeAgent === "ADMIN") && (
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase text-black/40">🤖 Admin Bot</div>
                            <button onClick={() => handleRunTask("ADMIN", "Generate Daily Report")} disabled={isProcessing} className="w-full text-left px-3 py-2 bg-white border border-black/10 rounded-lg hover:border-brand-black text-sm font-semibold disabled:opacity-50">
                                📄 Daily Report
                            </button>
                            <button onClick={() => handleRunTask("ADMIN", "Check Staff Roster")} disabled={isProcessing} className="w-full text-left px-3 py-2 bg-white border border-black/10 rounded-lg hover:border-brand-black text-sm font-semibold disabled:opacity-50">
                                👥 Check Roster
                            </button>
                        </div>
                    )}

                    {/* Content Bot Params */}
                    {(activeAgent === "ALL" || activeAgent === "CONTENT") && (
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase text-black/40">🎨 Content Bot</div>
                            <button onClick={() => handleRunTask("CONTENT", "Scan Viral Sounds")} disabled={isProcessing} className="w-full text-left px-3 py-2 bg-white border border-black/10 rounded-lg hover:border-brand-black text-sm font-semibold disabled:opacity-50">
                                🎵 Scan Trends
                            </button>
                            <button onClick={() => handleRunTask("CONTENT", "Draft Weekend Captions")} disabled={isProcessing} className="w-full text-left px-3 py-2 bg-white border border-black/10 rounded-lg hover:border-brand-black text-sm font-semibold disabled:opacity-50">
                                ✍️ Draft Captions
                            </button>
                        </div>
                    )}

                    {/* Analytics Bot Params */}
                    {(activeAgent === "ALL" || activeAgent === "ANALYTICS") && (
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase text-black/40">📈 Analytics Bot</div>
                            <button onClick={() => handleRunTask("ANALYTICS", "Forecast Inventory")} disabled={isProcessing} className="w-full text-left px-3 py-2 bg-white border border-black/10 rounded-lg hover:border-brand-black text-sm font-semibold disabled:opacity-50">
                                📊 Forecast Stock
                            </button>
                        </div>
                    )}
                </div>

                {/* Console Log Area */}
                <div className="flex-1 bg-black p-4 overflow-y-auto font-mono text-sm">
                    <div className="space-y-2">
                        {filteredLogs.map(log => (
                            <div key={log.id} className="flex gap-3">
                                <span className="text-gray-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                                <span className={`font-bold shrink-0 w-24 ${log.agent === 'ADMIN' ? 'text-blue-400' :
                                        log.agent === 'CONTENT' ? 'text-purple-400' : 'text-yellow-400'
                                    }`}>
                                    {log.agent}:
                                </span>
                                <span className={`${log.type === 'SUCCESS' ? 'text-green-400' :
                                        log.type === 'WARNING' ? 'text-orange-400' :
                                            log.type === 'ERROR' ? 'text-red-400' : 'text-gray-300'
                                    }`}>
                                    {log.message}
                                </span>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="text-gray-500 animate-pulse">... processing task ...</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
