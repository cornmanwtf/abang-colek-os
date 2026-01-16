import { useMemo, useState } from "react";
import type { BrandOSData, ContentPlan, HookTemplate, Event } from "../../types";
import { SCRIPT_TEMPLATES, generateManifesto } from "../../lib/generators";

interface TikTokViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedHook: HookTemplate | undefined;
  setSelectedHookId: (id: string) => void;
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
}

const createHook = (count: number): HookTemplate => ({
  id: `hook-${Date.now()}`,
  title: `New Hook ${count}`,
  text: "Describe the visual hook...",
  tags: ["viral", "abg-colek"],
});

const createPlan = (eventId: string): ContentPlan => ({
  id: `plan-${Date.now()}`,
  eventId,
  date: new Date().toISOString(),
  hookIds: [],
  shotList: [
    "Intro: 3s Hook",
    "Body: Product Hero Shot",
    "Body: Crowd Reaction",
    "Outro: Call to Action"
  ],
  notes: "",
});

const SUGGESTED_TAGS = ["viral", "funny", "shocking", "satisfying", "asmr", "promo", "event"];

export function TikTokView({
  data,
  setData,
  selectedHook,
  setSelectedHookId,
  selectedEventId,
  setSelectedEventId,
}: TikTokViewProps) {
  const [viewMode, setViewMode] = useState<"HOOKS" | "PLANNER" | "SCRIPTS" | "MANIFESTO">("PLANNER");
  const [generatedScript, setGeneratedScript] = useState("");
  const [scriptInputs, setScriptInputs] = useState<string[]>(["", "", ""]);
  const [activeTemplate, setActiveTemplate] = useState(SCRIPT_TEMPLATES[0]);
  const [manifestoText, setManifestoText] = useState("");

  // Hooks Logic
  const handleAddHook = () => {
    const next = createHook(data.hooks.length + 1);
    setData((prev) => ({ ...prev, hooks: [...prev.hooks, next] }));
    setSelectedHookId(next.id);
    setViewMode("HOOKS");
  };

  const handleDeleteHook = (id: string) => {
    if (!confirm("Delete this hook?")) return;
    setData(prev => ({
      ...prev,
      hooks: prev.hooks.filter(h => h.id !== id),
      contentPlans: prev.contentPlans.map(p => ({
        ...p,
        hookIds: p.hookIds.filter(hid => hid !== id)
      }))
    }));
    if (selectedHook?.id === id) setSelectedHookId("");
  };

  const updateHook = (id: string, updates: Partial<HookTemplate>) => {
    setData(prev => ({
      ...prev,
      hooks: prev.hooks.map(h => h.id === id ? { ...h, ...updates } : h)
    }));
  };

  // Planner Logic
  const sortedEvents = useMemo(() => {
    return [...data.events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [data.events]);

  const activePlan = useMemo(
    () => data.contentPlans.find((item) => item.eventId === selectedEventId),
    [data.contentPlans, selectedEventId]
  );

  const handleCreatePlan = (eventId: string) => {
    const next = createPlan(eventId);
    setData((prev) => ({ ...prev, contentPlans: [...prev.contentPlans, next] }));
  };

  const updatePlan = (planId: string, updates: Partial<ContentPlan>) => {
    setData(prev => ({
      ...prev,
      contentPlans: prev.contentPlans.map(p => p.id === planId ? { ...p, ...updates } : p)
    }));
  };

  const handleGenerateScript = () => {
    const script = activeTemplate.format(scriptInputs);
    setGeneratedScript(script);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }

  return (
    <section className="bg-white rounded-xl border border-black/10 overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 border-b border-black/5 p-4 flex justify-between items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-black/40">Content Engine</div>
          <h2 className="text-xl font-heading font-bold text-brand-black leading-none mt-1">TikTok Strategy</h2>
        </div>
        <div className="flex bg-white rounded-lg border border-black/10 p-1">
          <button
            onClick={() => setViewMode("PLANNER")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${viewMode === "PLANNER" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Planner
          </button>
          <button
            onClick={() => setViewMode("HOOKS")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${viewMode === "HOOKS" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Hook Bank
          </button>
          <button
            onClick={() => setViewMode("SCRIPTS")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${viewMode === "SCRIPTS" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Scripts
          </button>
          <button
            onClick={() => setViewMode("MANIFESTO")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${viewMode === "MANIFESTO" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Manifesto
          </button>
        </div>
      </div>

      {/* Content View */}
      <div className="flex-1 overflow-auto p-4">

        {/* MODE: HOOK BANK */}
        {viewMode === "HOOKS" && (
          <div className="grid md:grid-cols-[300px_1fr] gap-6 h-full">
            {/* List */}
            <div className="border-r border-black/5 pr-4 space-y-3">
              <button
                onClick={handleAddHook}
                className="w-full py-2 border-2 border-dashed border-black/10 rounded-lg text-sm font-bold text-black/50 hover:border-brand-red hover:text-brand-red transition-colors uppercase"
              >
                + New Hook
              </button>
              <div className="space-y-2">
                {data.hooks.map(hook => (
                  <div
                    key={hook.id}
                    onClick={() => setSelectedHookId(hook.id)}
                    className={`group relative p-3 rounded-lg border cursor-pointer transition-all ${selectedHook?.id === hook.id
                      ? "bg-brand-paper border-brand-gold shadow-sm"
                      : "bg-white border-black/5 hover:border-black/20"
                      }`}
                  >
                    <div className="font-bold text-sm text-brand-black">{hook.title}</div>
                    <div className="text-xs text-black/50 truncate">{hook.text}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteHook(hook.id); }}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="h-full">
              {selectedHook ? (
                <div className="max-w-xl space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-black/50 mb-1">Hook Title</label>
                    <input
                      value={selectedHook.title}
                      onChange={e => updateHook(selectedHook.id, { title: e.target.value })}
                      className="w-full text-xl font-heading font-bold bg-transparent border-b border-black/10 focus:border-brand-red focus:outline-none py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-black/50 mb-1">Script / Visual Description</label>
                    <textarea
                      value={selectedHook.text}
                      onChange={e => updateHook(selectedHook.id, { text: e.target.value })}
                      className="w-full min-h-[150px] rounded-lg border border-black/10 p-3 text-sm focus:border-brand-red focus:outline-none resize-none bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-black/50 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedHook.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-brand-black text-white text-xs rounded-full flex items-center gap-1">
                          #{tag}
                          <button onClick={() => updateHook(selectedHook.id, { tags: selectedHook.tags.filter(t => t !== tag) })} className="hover:text-brand-red">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_TAGS.filter(t => !selectedHook.tags.includes(t)).map(tag => (
                        <button
                          key={tag}
                          onClick={() => updateHook(selectedHook.id, { tags: [...selectedHook.tags, tag] })}
                          className="px-2 py-1 border border-dashed border-black/20 text-xs rounded-full hover:border-brand-black hover:bg-white"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-black/30 text-sm font-medium">Select a hook to edit</div>
              )}
            </div>
          </div>
        )}

        {/* MODE: CONTENT PLANNER */}
        {viewMode === "PLANNER" && (
          <div className="grid md:grid-cols-[280px_1fr] gap-6 h-full">
            {/* Event List */}
            <div className="border-r border-black/5 pr-4 space-y-2 overflow-y-auto max-h-[600px]">
              <div className="text-xs font-bold uppercase text-black/40 mb-2">Upcoming Events</div>
              {sortedEvents.map(event => {
                const hasPlan = data.contentPlans.some(p => p.eventId === event.id);
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`p-3 rounded-lg border cursor-pointer ${selectedEventId === event.id
                      ? "bg-brand-paper border-brand-gold shadow-sm"
                      : "bg-white border-black/5 hover:border-black/20"
                      }`}
                  >
                    <div className="text-xs font-bold text-gray-500 mb-1">
                      {new Date(event.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="font-bold text-sm text-brand-black leading-tight mb-2">{event.title}</div>
                    <div className="flex gap-1">
                      {hasPlan ? (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded">Planned</span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold rounded">No Plan</span>
                      )}
                      <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold rounded ${event.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Planning Board */}
            <div className="h-full overflow-y-auto">
              {activePlan ? (
                <div className="max-w-2xl space-y-8">
                  <div className="bg-gradient-to-r from-brand-black to-gray-800 text-white p-4 rounded-xl shadow-lg">
                    <div className="text-xs font-bold uppercase opacity-70 mb-1">Target Event</div>
                    <h3 className="text-2xl font-heading font-bold">{data.events.find(e => e.id === selectedEventId)?.title}</h3>
                    <div className="mt-4 flex gap-4 text-sm font-medium opacity-90">
                      <div className="bg-white/10 px-3 py-1 rounded">
                        📽️ Hooks: {activePlan.hookIds.length}
                      </div>
                      <div className="bg-white/10 px-3 py-1 rounded">
                        🎬 Shots: {activePlan.shotList.length}
                      </div>
                    </div>
                  </div>

                  {/* Hook Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-heading font-bold text-lg uppercase text-brand-black">Selected Hooks</h4>
                      <button onClick={() => setViewMode("HOOKS")} className="text-xs font-bold text-brand-red hover:underline">+ Create New Hook</button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.hooks.map(hook => {
                        const isSelected = activePlan.hookIds.includes(hook.id);
                        return (
                          <div
                            key={hook.id}
                            onClick={() => {
                              const newIds = isSelected
                                ? activePlan.hookIds.filter(id => id !== hook.id)
                                : [...activePlan.hookIds, hook.id];
                              updatePlan(activePlan.id, { hookIds: newIds });
                            }}
                            className={`cursor-pointer p-3 rounded border transition-all ${isSelected
                              ? "border-brand-red bg-red-50"
                              : "border-black/10 bg-white hover:border-black/30"
                              }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`text-sm font-bold ${isSelected ? "text-brand-red" : "text-black/70"}`}>{hook.title}</span>
                              {isSelected && <span className="text-brand-red">✓</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Shot List */}
                  <div>
                    <h4 className="font-heading font-bold text-lg uppercase text-brand-black mb-3">Shot List</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <textarea
                        value={activePlan.shotList.join("\n")}
                        onChange={e => updatePlan(activePlan.id, { shotList: e.target.value.split("\n") })}
                        className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[200px] text-sm leading-relaxed"
                        placeholder="1. Intro Shot..."
                      />
                      <div className="text-[10px] text-yellow-700 font-bold uppercase tracking-wider mt-2 border-t border-yellow-200 pt-2">
                        Simple List • One shot per line
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedEventId ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-xl font-bold text-brand-black mb-2">No Content Plan Yet</h3>
                  <p className="text-black/60 max-w-xs mx-auto mb-6">Start planning your TikTok content for this event. Select hooks and create your shot list.</p>
                  <button
                    onClick={() => handleCreatePlan(selectedEventId)}
                    className="bg-brand-red text-white font-bold uppercase px-6 py-3 rounded-lg hover:brightness-110 shadow-lg"
                  >
                    Create Content Plan
                  </button>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-black/30 text-sm font-medium">Select an event to start planning</div>
              )}
            </div>
          </div>
        )}

        { /* MODE: SCRIPTS */}
        {viewMode === "SCRIPTS" && (
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-2">Select Template</label>
                <div className="flex flex-wrap gap-2">
                  {SCRIPT_TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTemplate(t)}
                      className={`px-4 py-2 text-sm font-bold border rounded-full ${activeTemplate.id === t.id ? "bg-black text-white border-black" : "bg-white border-black/10 hover:border-black/30"}`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {activeTemplate.structure.map((part, index) => (
                  <div key={index}>
                    <label className="block text-xs font-bold uppercase text-black/50 mb-1">{part.label}</label>
                    <input
                      placeholder={part.description}
                      value={scriptInputs[index] || ""}
                      onChange={(e) => {
                        const next = [...scriptInputs];
                        next[index] = e.target.value;
                        setScriptInputs(next);
                      }}
                      className="w-full p-2 rounded border border-black/10 text-sm focus:border-brand-red focus:outline-none"
                    />
                  </div>
                ))}
                <button onClick={handleGenerateScript} className="w-full bg-brand-red text-white font-bold uppercase py-3 rounded-lg hover:brightness-110">
                  Generate Script
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-black/5 relative">
              <div className="text-xs font-bold uppercase text-black/40 mb-2">Output Preview</div>
              <pre className="whitespace-pre-wrap font-mono text-sm text-black/80">{generatedScript || "Waiting for input..."}</pre>
              {generatedScript && (
                <button onClick={() => handleCopy(generatedScript)} className="absolute top-4 right-4 text-xs font-bold bg-white border border-black/10 px-3 py-1 rounded shadow-sm hover:bg-gray-50">
                  Copy
                </button>
              )}
            </div>
          </div>
        )}

        { /* MODE: MANIFESTO */}
        {viewMode === "MANIFESTO" && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-brand-black mb-6">Abang Colek AI Rant Generator</h2>
            <p className="text-black/60 mb-8">Generate viral-worthy business philosophy, complaints, and advice in the voice of Abang Colek.</p>

            <div className="w-full bg-brand-paper p-8 rounded-xl shadow-lg border border-brand-gold relative mb-8 min-h-[150px] flex items-center justify-center">
              {manifestoText ? (
                <p className="text-xl font-medium leading-relaxed">"{manifestoText}"</p>
              ) : (
                <span className="text-black/20 italic">Press button to rant...</span>
              )}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setManifestoText(generateManifesto())} className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold uppercase text-lg hover:scale-105 transition-transform shadow-xl">
                🔥 Generate Rant
              </button>
              {manifestoText && (
                <button onClick={() => handleCopy(manifestoText)} className="bg-white border border-black/10 text-black px-6 py-4 rounded-xl font-bold uppercase hover:bg-gray-50">
                  Copy
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
