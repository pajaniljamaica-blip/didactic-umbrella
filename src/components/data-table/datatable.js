import React, { useState, useMemo } from "react";

const PAGE_SIZE = 10;

function ProductTable({ items }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sidePanelData, setSidePanelData] = useState(null);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lowerSearch = search.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.price.toString().includes(lowerSearch) ||
        item.id.toString().includes(lowerSearch)
    );
  }, [items, search]);

  const sortedItems = useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);


  const pageCount = Math.ceil(sortedItems.length / PAGE_SIZE);
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedItems.slice(start, start + PAGE_SIZE);
  }, [sortedItems, currentPage]);


  function handleSelectAllChange(e) {
    const newSelectedIds = new Set(selectedIds);
    if (e.target.checked) {
      pagedItems.forEach((item) => newSelectedIds.add(item.id));
    } else {
      pagedItems.forEach((item) => newSelectedIds.delete(item.id));
    }
    setSelectedIds(newSelectedIds);
  }

  const allPageSelected = pagedItems.every((item) => selectedIds.has(item.id));
  const somePageSelected = pagedItems.some((item) => selectedIds.has(item.id)) && !allPageSelected;

  function handleCheckboxChange(e, id) {
    const newSelectedIds = new Set(selectedIds);
    if (e.target.checked) newSelectedIds.add(id);
    else newSelectedIds.delete(id);
    setSelectedIds(newSelectedIds);
  }

  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  }

  function goToPage(page) {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
    
      <div style={{ flex: 1, overflowX: "auto", padding: 10, backgroundColor: "#f0f4f8", borderRadius: 8 }}>
    
        <div style={{ marginBottom: 15, textAlign: "center" }}>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "8px 12px",
              width: 280,
              borderRadius: 5,
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%", borderRadius: 8 }}>
          <thead>
            <tr style={{ backgroundColor: "#cce4f6", color: "#034f84", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = somePageSelected;
                  }}
                  onChange={handleSelectAllChange}
                />
              </th>
              {[
                { key: "id", label: "ID" },
                { key: "name", label: "Product Name" },
                { key: "price", label: "Price" },
                { key: "category", label: "Category" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => requestSort(key)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    padding: "10px",
                    borderBottom: "2px solid #034f84",
                  }}
                >
                  {label}
                  {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedItems.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                  No results found.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSidePanelData(item)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedIds.has(item.id) ? "#d6ebff" : "white",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f2ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = selectedIds.has(item.id) ? "#d6ebff" : "white")
                  }
                >
                  <td onClick={(e) => e.stopPropagation()} style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                    />
                  </td>
                  <td style={{ padding: "8px" }}>{item.id}</td>
                  <td style={{ padding: "8px" }}>{item.name}</td>
                  <td style={{ padding: "8px" }}>₱{item.price}</td>
                  <td style={{ padding: "8px" }}>{item.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        
        <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 8 }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              fontWeight: "bold",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            &lt;
          </button>
          {[...Array(pageCount)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                style={{
                  padding: "6px 12px",
                  fontWeight: currentPage === pageNum ? "bold" : "normal",
                  textDecoration: currentPage === pageNum ? "underline" : "none",
                  backgroundColor: currentPage === pageNum ? "#cce4f6" : "#e0e0e0",
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount}
            style={{
              padding: "6px 12px",
              fontWeight: "bold",
              cursor: currentPage === pageCount ? "not-allowed" : "pointer",
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      
      {sidePanelData && (
        <div
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "#f0f4f8",
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#034f84" }}>Product Details</h2>
          <button
            onClick={() => setSidePanelData(null)}
            style={{
              marginBottom: 15,
              cursor: "pointer",
              backgroundColor: "#034f84",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: 4,
            }}
          >
            Close ✖
          </button>
          <div style={{ lineHeight: 1.8 }}>
            <div>
              <strong>ID:</strong> {sidePanelData.id}
            </div>
            <div>
              <strong>Name:</strong> {sidePanelData.name}
            </div>
            <div>
              <strong>Price:</strong> ₱{sidePanelData.price}
            </div>
            <div>
              <strong>Category:</strong> {sidePanelData.category}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable; 