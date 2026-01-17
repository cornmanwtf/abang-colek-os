import { useState } from "react";
import type { BrandOSData, BoothChecklist } from "../../types";

interface BoothOpsViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedEventId: string;
}

const createChecklist = (eventId: string): BoothChecklist => ({
  id: `booth-${Date.now()}`,
  eventId,
  items: [],
  notes: "",
});

const DEFAULT_SOP_ITEMS = [
  { label: "Gas Hose Connected Securely", type: "OPENING" },
  { label: "Oil Temperature Check (170°C)", type: "OPENING" },
  { label: "Table Sanitized", type: "HYGIENE" },
  { label: "Menu Display ON", type: "OPENING" },
  { label: "Gloves & Apron On", type: "HYGIENE" },
  { label: "Stock Count Recorded", type: "CLOSING" },
  { label: "Cash Float Verified", type: "OPENING" },
  { label: "Trash Cleared", type: "CLOSING" },
];

export function BoothOpsView({
  data,
  setData,
  selectedEventId,
}: BoothOpsViewProps) {
  const [activeTab, setActiveTab] = useState<"CHECKLIST" | "POS" | "INVENTORY">("CHECKLIST");
  const [newItemLabel, setNewItemLabel] = useState("");

  // Pos State
  const [cart, setCart] = useState<{ name: string, price: number, qty: number }[]>([]);
  const [queueNumber, setQueueNumber] = useState(100);

  // Inventory State (Mock for now, will link to Types later if needed)
  const [stock, setStock] = useState({
    "Ayam Gunting Original": 50,
    "Ayam Gunting Spicy": 50,
    "Sosej Jumbo": 30,
    "Air Balang": 100
  });

  const event = data.events.find((item) => item.id === selectedEventId);
  const checklist = data.boothChecklists.find(
    (item) => item.eventId === selectedEventId
  );

  const handleCreateChecklist = () => {
    if (!event) return;
    const next = createChecklist(event.id);
    // Auto-populate defaults
    const defaultItems = DEFAULT_SOP_ITEMS.map((item, idx) => ({
      id: `def-${idx}-${Date.now()}`,
      label: `[${item.type}] ${item.label}`,
      required: true,
      done: false
    }));
    next.items = defaultItems;

    setData((prev) => ({
      ...prev,
      boothChecklists: [...prev.boothChecklists, next],
    }));
  };

  const handleToggleItem = (id: string, _currentDone: boolean) => {
    if (!checklist) return;
    // Logic to toggle
    setData((prev) => ({
      ...prev,
      boothChecklists: prev.boothChecklists.map((list) =>
        list.id === checklist.id
          ? {
            ...list,
            items: list.items.map((item) =>
              item.id === id ? { ...item, done: !item.done } : item
            ),
          }
          : list
      ),
    }));
  };

  const handleAddItem = () => {
    if (!checklist || !newItemLabel.trim()) return;
    const item = {
      id: `booth-item-${Date.now()}`,
      label: newItemLabel.trim(),
      required: true,
      done: false,
    };
    setData((prev) => ({
      ...prev,
      boothChecklists: prev.boothChecklists.map((list) =>
        list.id === checklist.id
          ? { ...list, items: [...list.items, item] }
          : list
      ),
    }));
    setNewItemLabel("");
  };

  // POS Functions
  const addToCart = (name: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.name === name);
      if (existing) {
        return prev.map(p => p.name === name ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    // Deduct stock (simple mock logic)
    const newStock = { ...stock };
    cart.forEach(item => {
      if ((newStock as any)[item.name]) {
        (newStock as any)[item.name] -= item.qty;
      }
    });
    setStock(newStock);

    alert(`Order #${queueNumber} Confirmed! Total: RM ${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}`);
    setQueueNumber(prev => prev + 1);
    clearCart();
  };

  if (!event) {
    return (
      <section className="bg-white rounded-xl border border-black/10 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="text-4xl mb-4">🏪</div>
        <h3 className="text-xl font-bold text-brand-black mb-2">Booth Operations</h3>
        <p className="text-black/60">Select an event from the sidebar to launch the Booth OS.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl border border-black/10 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="bg-brand-black text-white p-4 flex justify-between items-center shrink-0">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider opacity-60">Event Ops</div>
          <h2 className="text-xl font-heading font-bold leading-none mt-1">{event.title}</h2>
        </div>
        <div className="flex bg-white/10 rounded-lg p-1">
          {(["CHECKLIST", "POS", "INVENTORY"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${activeTab === tab ? "bg-brand-red text-white" : "text-white/60 hover:bg-white/20"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        {activeTab === "CHECKLIST" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!checklist ? (
              <div className="text-center py-10">
                <p className="text-black/60 mb-4">No Active Checklist for this event.</p>
                <button onClick={handleCreateChecklist} className="bg-brand-black text-white px-6 py-2 rounded font-bold uppercase">Initialize Ops Checklist</button>
              </div>
            ) : (
              <>
                {/* Progres Bar */}
                <div className="bg-white p-4 rounded-lg border border-black/5 shadow-sm mb-6">
                  <div className="flex justify-between text-xs font-bold uppercase mb-2">
                    <span>Progress</span>
                    <span>{Math.round((checklist.items.filter(i => i.done).length / checklist.items.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${(checklist.items.filter(i => i.done).length / checklist.items.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {checklist.items.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleItem(item.id, item.done)}
                      className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${item.done ? "bg-green-50 border-green-200" : "bg-white border-black/5 hover:border-brand-gold"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${item.done ? "border-green-500 bg-green-500 text-white" : "border-gray-300"
                          }`}>
                          {item.done && "✓"}
                        </div>
                        <div>
                          <div className={`font-bold text-sm ${item.done ? "text-green-800 line-through opacity-70" : "text-brand-black"}`}>
                            {item.label}
                          </div>
                          {item.required && <div className="text-[10px] uppercase font-bold text-red-500">Required</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    className="flex-1 rounded border border-black/10 px-3 py-2 text-sm"
                    placeholder="Add ad-hoc item..."
                    value={newItemLabel}
                    onChange={e => setNewItemLabel(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddItem()}
                  />
                  <button onClick={handleAddItem} className="bg-black/10 hover:bg-black/20 px-4 py-2 rounded font-bold uppercase text-sm">Add</button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "POS" && (
          <div className="grid md:grid-cols-[1fr_350px] gap-6 h-full">
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
              {Object.entries(stock).map(([name, qty]) => (
                <button
                  key={name}
                  onClick={() => addToCart(name, name.includes("Ayam") ? 15 : 5)}
                  className="bg-white p-4 rounded-xl border border-black/5 hover:border-brand-red shadow-sm flex flex-col items-start text-left active:scale-95 transition-transform"
                >
                  <div className="font-heading font-bold text-lg leading-tight mb-1">{name}</div>
                  <div className="text-brand-red font-bold">RM {name.includes("Ayam") ? "15.00" : "5.00"}</div>
                  <div className={`text-xs mt-2 px-2 py-0.5 rounded-full ${qty < 10 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                    Stock: {qty} left
                  </div>
                </button>
              ))}
            </div>

            {/* Cart */}
            <div className="bg-white rounded-xl border border-black/10 p-4 flex flex-col h-full">
              <div className="flex justify-between items-end mb-4 border-b pb-2">
                <div>
                  <div className="text-xs uppercase font-bold text-gray-400">Order Queue</div>
                  <div className="text-3xl font-heading font-bold text-brand-black">#{queueNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase font-bold text-gray-400">Total</div>
                  <div className="text-2xl font-bold text-brand-red">RM {cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {cart.length === 0 && <div className="text-center text-gray-400 py-10 italic">Empty Order</div>}
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-xs text-gray-500">RM {item.price.toFixed(2)} x {item.qty}</div>
                    </div>
                    <div className="font-bold">RM {(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 shadow-sm">
                  CONFIRM & PAID (CASH)
                </button>
                <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-sm">
                  QR PAY (DUITNOW)
                </button>
                <button onClick={clearCart} className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg font-bold hover:bg-gray-200">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "INVENTORY" && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-brand-black text-white text-xs uppercase">
                <tr>
                  <th className="p-4">Item Name</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Quantity</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(stock).map(([name, qty]) => (
                  <tr key={name} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-brand-black">{name}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${qty > 20 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {qty > 20 ? "Good" : "Low"}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-lg">{qty}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setStock(s => ({ ...s, [name]: (s as any)[name] - 1 }))}
                          className="w-8 h-8 rounded bg-gray-100 hover:bg-red-100 text-red-600 font-bold"
                        >-</button>
                        <button
                          onClick={() => setStock(s => ({ ...s, [name]: (s as any)[name] + 1 }))}
                          className="w-8 h-8 rounded bg-gray-100 hover:bg-green-100 text-green-600 font-bold"
                        >+</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
