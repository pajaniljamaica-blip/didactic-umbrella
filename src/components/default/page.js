import { useState, useMemo } from "react";
import rawData from "./data.json";
import ProductTable from "../../app/main/homepage/components/data-table/datatable";

// ─── Sample Data ─────────────────────────────────────────────────────────────
const initialData = [
  { id: 1,  name: "Claw Hammer",           category: "Tools",       price: 450  },
  { id: 2,  name: "Power Drill",           category: "Power Tools", price: 2800 },
  { id: 3,  name: "Ladder (6ft)",          category: "Equipment",   price: 1800 },
  { id: 4,  name: "Wire Stripper",         category: "Electrical",  price: 320  },
  { id: 5,  name: "Garden Hose",           category: "Garden",      price: 580  },
  { id: 6,  name: "Hard Hat",              category: "Safety",      price: 680  },
  { id: 7,  name: "Paint Roller Set",      category: "Painting",    price: 290  },
  { id: 8,  name: "Toolbox (Large)",       category: "Storage",     price: 1250 },
  { id: 9,  name: "Work Bench",            category: "Furniture",   price: 4500 },
  { id: 10, name: "LED Flood Light",       category: "Lighting",    price: 760  },
  { id: 11, name: "Utility Belt",          category: "Accessories", price: 550  },
  { id: 12, name: "Circular Saw",          category: "Power Tools", price: 3600 },
  { id: 13, name: "Measuring Tape",        category: "Tools",       price: 180  },
  { id: 14, name: "Extension Cord",        category: "Electrical",  price: 420  },
  { id: 15, name: "Wheelbarrow",           category: "Equipment",   price: 2200 },
  { id: 16, name: "Safety Goggles",        category: "Safety",      price: 210  },
  { id: 17, name: "Paint Brush Set",       category: "Painting",    price: 340  },
  { id: 18, name: "Storage Shelf",         category: "Storage",     price: 1900 },
  { id: 19, name: "Angle Grinder",         category: "Power Tools", price: 2400 },
  { id: 20, name: "Garden Trowel",         category: "Garden",      price: 130  },
  { id: 21, name: "Pipe Wrench",           category: "Tools",       price: 520  },
  { id: 22, name: "Work Lamp",             category: "Lighting",    price: 480  },
  { id: 23, name: "Knee Pads",             category: "Safety",      price: 290  },
  { id: 24, name: "Stud Finder",           category: "Tools",       price: 680  },
  { id: 25, name: "Jigsaw",               category: "Power Tools", price: 3100 },
];

const CATEGORIES = ["Tools","Power Tools","Equipment","Electrical","Garden","Safety","Painting","Storage","Furniture","Lighting","Accessories"];

const categoryColors = {
  "Tools":       { bg: "#d4a96a22", text: "#8B5E3C", border: "#d4a96a66" },
  "Power Tools": { bg: "#c8351522", text: "#8B2010", border: "#c8351566" },
  "Equipment":   { bg: "#b8965022", text: "#6b4020", border: "#b8965066" },
  "Electrical":  { bg: "#3a6e9822", text: "#1a4e78", border: "#3a6e9866" },
  "Garden":      { bg: "#4a8c4022", text: "#2a5c20", border: "#4a8c4066" },
  "Safety":      { bg: "#e8880022", text: "#8B5000", border: "#e8880066" },
  "Painting":    { bg: "#9c6ba022", text: "#5c3b70", border: "#9c6ba066" },
  "Storage":     { bg: "#607d8b22", text: "#37474f", border: "#607d8b66" },
  "Furniture":   { bg: "#8d6e6322", text: "#4e342e", border: "#8d6e6366" },
  "Lighting":    { bg: "#f9a82522", text: "#e65100", border: "#f9a82566" },
  "Accessories": { bg: "#78909c22", text: "#37474f", border: "#78909c66" },
};

const categoryEmoji = {
  "Tools":"🔧","Power Tools":"⚡","Equipment":"🏗️","Electrical":"🔌",
  "Garden":"🌿","Safety":"🦺","Painting":"🎨","Storage":"📦",
  "Furniture":"🪑","Lighting":"💡","Accessories":"🎒",
};

// ─── CategoryBadge ───────────────────────────────────────────────────────────
function CategoryBadge({ category }) {
  const c = categoryColors[category] || { bg: "#f0e8d822", text: "#8B5E3C", border: "#d4a96a55" };
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: "3px 12px", fontSize: "0.77rem",
      fontWeight: 700, letterSpacing: "0.03em", whiteSpace: "nowrap",
    }}>{category}</span>
  );
}

// ─── AddModal ────────────────────────────────────────────────────────────────
function AddModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ name: "", category: CATEGORIES[0], price: "" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name.trim()) { setError("Product name is required."); return; }
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) { setError("Enter a valid price."); return; }
    onAdd({ id: nextId, name: form.name.trim(), category: form.category, price: Number(form.price) });
    onClose();
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "10px 14px",
    border: "1.5px solid #dfd0b8", borderRadius: 8, background: "#fdf8f2",
    color: "#3d2010", fontSize: "0.92rem", fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "linear-gradient(165deg, #fdf6ee, #f3e6d0)", borderRadius: 14, width: 400, boxShadow: "0 20px 60px #3d1e0840", border: "1.5px solid #dfd0b8", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(90deg, #4a2510, #8B5E3C)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#f5ede0", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>➕ Add New Product</span>
          <button onClick={onClose} style={{ background: "#ffffff22", border: "none", color: "#f5ede0", width: 26, height: 26, borderRadius: "50%", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {error && <div style={{ background: "#c8351518", border: "1px solid #c8351560", borderRadius: 8, padding: "8px 12px", color: "#8B2010", fontSize: "0.82rem", fontWeight: 600 }}>{error}</div>}
          <div>
            <label style={{ color: "#8B5E3C", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Product Name</label>
            <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Cordless Screwdriver" />
          </div>
          <div>
            <label style={{ color: "#8B5E3C", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Category</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: "#8B5E3C", fontSize: "0.73rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Price (₱)</label>
            <input style={inputStyle} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 1200" min="1" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f0e8d8", border: "1.5px solid #d4c4ac", borderRadius: 8, color: "#8B5E3C", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={handleSubmit} style={{ flex: 2, padding: "11px", background: "linear-gradient(90deg, #5a2e10, #8B5E3C)", border: "none", borderRadius: 8, color: "#f5ede0", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px #8B5E3C40" }}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DeleteConfirmModal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ count, onConfirm, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: "linear-gradient(165deg, #fdf6ee, #f3e6d0)", borderRadius: 14, width: 360, boxShadow: "0 20px 60px #3d1e0840", border: "1.5px solid #dfd0b8", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
        <div style={{ background: "linear-gradient(90deg, #8B2010, #c83515)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff5f0", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>⚠️ Confirm Delete</span>
          <button onClick={onClose} style={{ background: "#ffffff22", border: "none", color: "#fff5f0", width: 26, height: 26, borderRadius: "50%", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "24px" }}>
          <p style={{ color: "#3d2010", margin: "0 0 20px", fontSize: "0.95rem", lineHeight: 1.5 }}>
            Are you sure you want to delete <strong>{count} item{count > 1 ? "s" : ""}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "#f0e8d8", border: "1.5px solid #d4c4ac", borderRadius: 8, color: "#8B5E3C", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 2, padding: "11px", background: "linear-gradient(90deg, #8B2010, #c83515)", border: "none", borderRadius: 8, color: "#fff5f0", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ item, allData, onClose }) {
  if (!item) return null;
  const priceRange = item.price < 200 ? "Budget" : item.price < 1000 ? "Mid-range" : "Premium";
  const priceColor = item.price < 200 ? "#4a8c40" : item.price < 1000 ? "#8B5E3C" : "#8B2010";
  const peers = allData.filter(r => r.category === item.category);
  const avg = peers.reduce((s, r) => s + r.price, 0) / peers.length;
  const diff = item.price - avg;

  return (
    <div style={{ width: 300, minWidth: 260, background: "linear-gradient(165deg, #fdf6ee 0%, #f3e6d0 100%)", borderLeft: "2px solid #dfd0b8", display: "flex", flexDirection: "column", boxShadow: "-10px 0 40px #8B5E3C18" }}>
      <div style={{ background: "linear-gradient(90deg, #4a2510, #8B5E3C)", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#f5ede0", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Item Details</span>
        <button onClick={onClose} style={{ background: "#ffffff22", border: "none", color: "#f5ede0", width: 26, height: 26, borderRadius: "50%", cursor: "pointer", fontSize: "0.85rem" }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <div style={{ width: "100%", height: 120, borderRadius: 10, background: "linear-gradient(135deg, #c8a060 0%, #7a4a20 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.2rem", marginBottom: 18, boxShadow: "0 6px 20px #8B5E3C30" }}>
          {categoryEmoji[item.category] || "🔩"}
        </div>
        <h2 style={{ margin: "0 0 10px", color: "#3d2010", fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h2>
        <div style={{ marginBottom: 16 }}><CategoryBadge category={item.category} /></div>
        <div style={{ background: "linear-gradient(90deg, #d4a96a30, #c8906030)", border: "1.5px solid #d4a96a60", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#8B5E3C", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Price</span>
            <span style={{ color: "#4a2510", fontWeight: 900, fontSize: "1.4rem" }}>₱{item.price.toLocaleString()}</span>
          </div>
          <div style={{ textAlign: "right", marginTop: 4 }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: priceColor, background: priceColor + "18", padding: "2px 10px", borderRadius: 10, border: `1px solid ${priceColor}40` }}>{priceRange}</span>
          </div>
        </div>
        {[["Product ID", `#${String(item.id).padStart(2, "0")}`], ["Category", item.category]].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #e0cfb8" }}>
            <span style={{ color: "#a07850", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
            <span style={{ color: "#3d2010", fontSize: "0.9rem", fontWeight: 600 }}>{val}</span>
          </div>
        ))}
        <div style={{ marginTop: 18, background: "#f5ecd8", borderRadius: 8, padding: "12px 14px", border: "1px solid #e0cfb8" }}>
          <p style={{ color: "#8B5E3C", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Category Average</p>
          <p style={{ color: "#5a3820", fontSize: "0.88rem", margin: 0, fontWeight: 500 }}>
            ₱{Math.round(avg).toLocaleString()} avg · This item is {Math.abs(Math.round(diff)).toLocaleString()} {diff >= 0 ? "above" : "below"} average
          </p>
        </div>
      </div>
      <div style={{ padding: "14px 18px", borderTop: "1.5px solid #dfd0b8" }}>
        <button style={{ width: "100%", padding: "11px", background: "linear-gradient(90deg, #5a2e10, #8B5E3C)", color: "#f5ede0", border: "none", borderRadius: 8, fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase", boxShadow: "0 4px 16px #8B5E3C40" }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────
function Pagination({ total, pageSize, setPageSize, currentPage, setCurrentPage }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSizes = [10, 20, 30, 40, 50];

  const pages = useMemo(() => {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (currentPage > 3) arr.push("…");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) arr.push(i);
      if (currentPage < totalPages - 2) arr.push("…");
      arr.push(totalPages);
    }
    return arr;
  }, [totalPages, currentPage]);

  const btnBase = {
    border: "1.5px solid #d4c4ac", borderRadius: 7, width: 34, height: 34,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "inherit", transition: "all 0.15s",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginTop: 16, padding: "12px 16px", background: "#fdf6ee", borderRadius: 10, border: "1.5px solid #e8d8c0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#8B5E3C", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Rows per page</span>
        <div style={{ display: "flex", gap: 4 }}>
          {pageSizes.map(size => (
            <button key={size} onClick={() => { setPageSize(size); setCurrentPage(1); }} style={{
              ...btnBase, width: "auto", padding: "0 10px",
              background: pageSize === size ? "#8B5E3C" : "#f5ede0",
              color: pageSize === size ? "#f5ede0" : "#8B5E3C",
              borderColor: pageSize === size ? "#8B5E3C" : "#d4c4ac",
            }}>{size}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ ...btnBase, background: "#f5ede0", color: currentPage === 1 ? "#c4b09a" : "#8B5E3C", opacity: currentPage === 1 ? 0.5 : 1 }}>‹</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e${i}`} style={{ color: "#b89a7a", padding: "0 4px", fontSize: "0.9rem" }}>…</span>
            : <button key={p} onClick={() => setCurrentPage(p)} style={{ ...btnBase, background: currentPage === p ? "linear-gradient(90deg,#5a2e10,#8B5E3C)" : "#f5ede0", color: currentPage === p ? "#f5ede0" : "#8B5E3C", borderColor: currentPage === p ? "#8B5E3C" : "#d4c4ac", boxShadow: currentPage === p ? "0 2px 8px #8B5E3C30" : "none" }}>{p}</button>
        )}
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ ...btnBase, background: "#f5ede0", color: currentPage === totalPages ? "#c4b09a" : "#8B5E3C", opacity: currentPage === totalPages ? 0.5 : 1 }}>›</button>
      </div>

      <span style={{ color: "#a07850", fontSize: "0.78rem" }}>
        Page <strong style={{ color: "#3d2010" }}>{currentPage}</strong> of <strong style={{ color: "#3d2010" }}>{totalPages}</strong>
      </span>
    </div>
  );
}

// ─── DataTable ───────────────────────────────────────────────────────────────
function ProductTable({ data, selectedIds, onSelect, onSelectAll, onRowClick, activeId, onDeleteRow }) {
  const allSelected = data.length > 0 && data.every(r => selectedIds.has(r.id));
  const someSelected = data.some(r => selectedIds.has(r.id)) && !allSelected;

  const thStyle = { padding: "11px 14px", color: "#8B5E3C", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "2px solid #dfd0b8", textAlign: "left", whiteSpace: "nowrap", background: "#f5ede0" };

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1.5px solid #dfd0b8", boxShadow: "0 4px 24px #8B5E3C10" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 42 }}>
              <input type="checkbox" checked={allSelected} ref={el => { if (el) el.indeterminate = someSelected; }} onChange={onSelectAll} style={{ cursor: "pointer", accentColor: "#8B5E3C", width: 15, height: 15 }} />
            </th>
            <th style={{ ...thStyle, width: 55 }}>ID</th>
            <th style={thStyle}>Product Name</th>
            <th style={thStyle}>Category</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Price</th>
            <th style={{ ...thStyle, width: 50, textAlign: "center" }}>Del</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#b89a7a", fontSize: "0.9rem" }}>No products found.</td></tr>
          ) : data.map((row, i) => {
            const isActive = row.id === activeId;
            const isSelected = selectedIds.has(row.id);
            return (
              <tr key={row.id} onClick={() => onRowClick(row)} style={{
                background: isActive ? "#f5ede0" : isSelected ? "#fdf3e5" : i % 2 === 0 ? "#fff" : "#fdf9f4",
                cursor: "pointer", transition: "background 0.12s",
                borderLeft: isActive ? "3px solid #8B5E3C" : "3px solid transparent",
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#fdf3e5"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isSelected ? "#fdf3e5" : i % 2 === 0 ? "#fff" : "#fdf9f4"; }}
              >
                <td style={{ padding: "11px 14px" }} onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={isSelected} onChange={() => onSelect(row.id)} style={{ cursor: "pointer", accentColor: "#8B5E3C", width: 15, height: 15 }} />
                </td>
                <td style={{ padding: "11px 14px", color: "#a07850", fontSize: "0.8rem", fontWeight: 700 }}>#{String(row.id).padStart(2, "0")}</td>
                <td style={{ padding: "11px 14px", color: "#3d2010", fontWeight: 600, fontSize: "0.9rem" }}>{row.name}</td>
                <td style={{ padding: "11px 14px" }}><CategoryBadge category={row.category} /></td>
                <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 800, color: "#4a2510", fontSize: "0.95rem", fontFamily: "monospace" }}>₱{row.price.toLocaleString()}</td>
                <td style={{ padding: "11px 14px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                  <button onClick={() => onDeleteRow(row.id)} title="Delete" style={{ background: "#c8351518", border: "1px solid #c8351540", borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: "#8B2010", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🗑</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Homepage ────────────────────────────────────────────────────────────────
export default function Homepage() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [activeRow, setActiveRow] = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSingleId, setDeleteSingleId] = useState(null);

  const categories = useMemo(() => ["All", ...CATEGORIES], []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(row => {
      const matchQ = !q || row.name.toLowerCase().includes(q) || row.category.toLowerCase().includes(q) || String(row.id).includes(q) || String(row.price).includes(q);
      return matchQ && (catFilter === "All" || row.category === catFilter);
    });
  }, [search, catFilter, data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSelect = (id) => setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const handleSelectAll = () => {
    const ids = paginated.map(r => r.id);
    const allSel = ids.every(id => selectedIds.has(id));
    setSelectedIds(prev => { const n = new Set(prev); allSel ? ids.forEach(id => n.delete(id)) : ids.forEach(id => n.add(id)); return n; });
  };
  const handleRowClick = (row) => setActiveRow(prev => prev?.id === row.id ? null : row);

  const handleAdd = (item) => {
    setData(prev => [...prev, item]);
  };

  const nextId = useMemo(() => Math.max(0, ...data.map(d => d.id)) + 1, [data]);

  const handleDeleteSingle = (id) => {
    setDeleteSingleId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteSelected = () => {
    setDeleteSingleId(null);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const toDelete = deleteSingleId ? new Set([deleteSingleId]) : selectedIds;
    setData(prev => prev.filter(r => !toDelete.has(r.id)));
    if (activeRow && toDelete.has(activeRow.id)) setActiveRow(null);
    setSelectedIds(prev => { const n = new Set(prev); toDelete.forEach(id => n.delete(id)); return n; });
    setDeleteSingleId(null);
    setShowDeleteConfirm(false);
    setCurrentPage(1);
  };

  const totalVal = [...selectedIds].reduce((s, id) => s + (data.find(r => r.id === id)?.price || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f0e8d8", fontFamily: "'Georgia', serif" }}>
      {/* Topbar */}
      <div style={{ background: "linear-gradient(90deg, #3d1e08 0%, #6b3f2a 60%, #8B5E3C 100%)", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 24px #3d1e0850" }}>
        <div>
          <div style={{ color: "#f5ede0", fontWeight: 900, fontSize: "1.45rem", letterSpacing: "0.06em" }}>Hardware Store</div>
          <div style={{ color: "#d4a96a", fontSize: "0.73rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>Inventory Manager</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#f5ede0aa", fontSize: "0.82rem" }}>{data.length} products · {categories.length - 1} categories</span>
          <button onClick={() => setShowAddModal(true)} style={{ padding: "9px 18px", background: "linear-gradient(90deg, #d4a96a, #c88040)", border: "none", borderRadius: 8, color: "#3d1e08", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", boxShadow: "0 2px 12px #d4a96a40" }}>
            ➕ Add Product
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", height: "calc(100vh - 66px)" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* Controls */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#c4a070", fontSize: "1.05rem" }}>⌕</span>
              <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search products…" style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 36px", border: "1.5px solid #dfd0b8", borderRadius: 8, background: "#fdf8f2", color: "#3d2010", fontSize: "0.92rem", fontFamily: "inherit", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => { setCatFilter(cat); setCurrentPage(1); }} style={{ padding: "7px 13px", borderRadius: 20, border: "1.5px solid", borderColor: catFilter === cat ? "#8B5E3C" : "#d4c4ac", background: catFilter === cat ? "#8B5E3C" : "#fdf8f2", color: catFilter === cat ? "#f5ede0" : "#8B5E3C", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Selection / action banner */}
          {selectedIds.size > 0 && (
            <div style={{ background: "#f5e8d4", border: "1.5px solid #d4a96a70", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: "#6b3f2a", fontWeight: 700, fontSize: "0.88rem" }}>{selectedIds.size} item{selectedIds.size > 1 ? "s" : ""} selected</span>
                <button onClick={handleDeleteSelected} style={{ padding: "6px 14px", background: "linear-gradient(90deg, #8B2010, #c83515)", border: "none", borderRadius: 7, color: "#fff5f0", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
                  🗑 Delete Selected
                </button>
              </div>
              <span style={{ color: "#4a2510", fontWeight: 900, fontSize: "1.05rem" }}>Total: ₱{totalVal.toLocaleString()}</span>
            </div>
          )}

          <ProductTable
            data={paginated}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            activeId={activeRow?.id}
            onDeleteRow={handleDeleteSingle}
          />

          <Pagination
            total={filtered.length}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={safePage}
            setCurrentPage={setCurrentPage}
          />

          <div style={{ marginTop: 8, color: "#b89a7a", fontSize: "0.82rem", textAlign: "right" }}>
            Showing <strong style={{ color: "#8B5E3C" }}>{filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)}</strong> of <strong style={{ color: "#8B5E3C" }}>{filtered.length}</strong> products
          </div>
        </div>

        {activeRow && <Sidebar item={activeRow} allData={data} onClose={() => setActiveRow(null)} />}
      </div>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} nextId={nextId} />}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          count={deleteSingleId ? 1 : selectedIds.size}
          onConfirm={confirmDelete}
          onClose={() => { setShowDeleteConfirm(false); setDeleteSingleId(null); }}
        />
      )}
    </div>
  );
}