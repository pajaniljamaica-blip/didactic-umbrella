import { useState, useRef } from "react";

const COLUMNS = [
  { key: "drag", label: "" },
  { key: "select", label: "" },
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "category", label: "Category" },
];

function CategoryBadge({ category }) {
  const colors = {
    Beverages: { bg: "#d4a96a22", text: "#8B5E3C", border: "#d4a96a55" },
    Bakery: { bg: "#c8a06022", text: "#7a4f2a", border: "#c8a06055" },
    Pantry: { bg: "#b8965022", text: "#6b4020", border: "#b8965055" },
    Dairy: { bg: "#e8d5b022", text: "#9a7040", border: "#e8d5b055" },
    Snacks: { bg: "#d9b07022", text: "#8a5a30", border: "#d9b07055" },
    Home: { bg: "#c5a88022", text: "#7a5535", border: "#c5a88055" },
  };
  const c = colors[category] || { bg: "#f0e8d822", text: "#8B5E3C", border: "#d4a96a55" };
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: "20px", padding: "3px 12px", fontSize: "0.78rem",
      fontWeight: 600, letterSpacing: "0.03em", fontFamily: "'Crimson Pro', serif"
    }}>
      {category}
    </span>
  );
}

export default function ProductTable({ data, selectedIds, onSelect, onSelectAll, onRowClick, selectedId }) {
  const [order, setOrder] = useState(data.map((_, i) => i));
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const dragIdx = useRef(null);
  const dragOverIdx = useRef(null);

  const allSelected = data.length > 0 && data.every(row => selectedIds.has(row.id));
  const someSelected = data.some(row => selectedIds.has(row.id));

  const handleSort = (key) => {
    if (!["id", "name", "price", "category"].includes(key)) return;
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sortedOrder = [...order].sort((a, b) => {
    if (!sortKey) return 0;
    const va = data[a][sortKey];
    const vb = data[b][sortKey];
    const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const onDragStart = (e, idx) => { dragIdx.current = idx; e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (e, idx) => { e.preventDefault(); dragOverIdx.current = idx; };
  const onDrop = () => {
    const from = dragIdx.current, to = dragOverIdx.current;
    if (from === null || to === null || from === to) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    setOrder(newOrder);
    dragIdx.current = null; dragOverIdx.current = null;
  };

  const SortArrow = ({ col }) => {
    if (sortKey !== col) return <span style={{ opacity: 0.25, fontSize: "0.7rem" }}>↕</span>;
    return <span style={{ fontSize: "0.75rem", color: "#8B5E3C" }}>{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: "12px", border: "1.5px solid #dfd0b8" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Crimson Pro', serif" }}>
        <thead>
          <tr style={{ background: "linear-gradient(90deg, #6b3f2a 0%, #8B5E3C 100%)" }}>
            {COLUMNS.map(col => (
              <th key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  padding: col.key === "drag" || col.key === "select" ? "14px 10px" : "14px 18px",
                  textAlign: col.key === "price" ? "right" : "left",
                  color: "#f5ede0", fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: ["id","name","price","category"].includes(col.key) ? "pointer" : "default",
                  userSelect: "none", whiteSpace: "nowrap", fontFamily: "'Playfair Display', serif",
                  borderBottom: "2px solid #5a3020",
                }}>
                {col.key === "select" ? (
                  <input type="checkbox" checked={allSelected} ref={el => { if (el) el.indeterminate = !allSelected && someSelected; }}
                    onChange={onSelectAll}
                    style={{ width: 16, height: 16, accentColor: "#f5ede0", cursor: "pointer" }} />
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: col.key === "price" ? "flex-end" : "flex-start" }}>
                    {col.label} {["id","name","price","category"].includes(col.key) && <SortArrow col={col.key} />}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedOrder.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: "center", padding: "48px", color: "#b89a7a", fontStyle: "italic", fontSize: "1.05rem" }}>No results found</td></tr>
          ) : sortedOrder.map((dataIdx, visualIdx) => {
            const row = data[dataIdx];
            if (!row) return null;
            const isSelected = selectedIds.has(row.id);
            const isActive = selectedId === row.id;
            return (
              <tr key={row.id}
                draggable
                onDragStart={e => onDragStart(e, visualIdx)}
                onDragOver={e => onDragOver(e, visualIdx)}
                onDrop={onDrop}
                onClick={() => onRowClick(row)}
                style={{
                  background: isActive ? "#e8d5b8" : isSelected ? "#f2e8d8" : visualIdx % 2 === 0 ? "#fdf8f2" : "#f9f3ea",
                  cursor: "pointer", transition: "background 0.15s",
                  borderBottom: "1px solid #e8dbc8",
                  outline: isActive ? "2px solid #8B5E3C" : "none",
                  outlineOffset: "-2px",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#f0e4d0"; }}
                onMouseLeave={e => { e.currentTarget.style.background = isActive ? "#e8d5b8" : isSelected ? "#f2e8d8" : visualIdx % 2 === 0 ? "#fdf8f2" : "#f9f3ea"; }}
              >
                <td style={{ padding: "12px 10px", textAlign: "center", color: "#c4a882", fontSize: "1rem", cursor: "grab" }}
                  onClick={e => e.stopPropagation()}>
                  ⠿
                </td>
                <td style={{ padding: "12px 10px" }} onClick={e => { e.stopPropagation(); onSelect(row.id); }}>
                  <input type="checkbox" checked={isSelected} onChange={() => onSelect(row.id)}
                    style={{ width: 15, height: 15, accentColor: "#8B5E3C", cursor: "pointer" }} />
                </td>
                <td style={{ padding: "12px 18px", color: "#b89a7a", fontSize: "0.9rem", fontWeight: 600 }}>#{row.id}</td>
                <td style={{ padding: "12px 18px", color: "#3d2010", fontSize: "1rem", fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: "12px 18px", textAlign: "right", color: "#6b3f2a", fontSize: "0.98rem", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                  ${row.price.toFixed(2)}
                </td>
                <td style={{ padding: "12px 18px" }}><CategoryBadge category={row.category} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}