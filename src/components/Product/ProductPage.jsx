import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../../data/products";
import "./product.css"; 
// Note: Catgory import remains if needed elsewhere, but price logic is removed below

const CATEGORIES = ["All", "Machine Component", "Belt", "Bearing","Gear","Sive"];

export default function Products({ addToCart, cart = [] }) {
  const { category } = useParams();
  const navigate     = useNavigate();

  const [search,      setSearch]      = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [toast,       setToast]       = useState(null);
  const [added,       setAdded]       = useState({});
  const [view,        setView]        = useState("grid"); 
  const toastTimer = useRef(null);

  /* ── Filter Logic ── */
  const currentCategory = category
    ? category.replace(/-/g, " ").toLowerCase()
    : selectedCat.toLowerCase();

  let filtered = [...products];

  if (currentCategory !== "all") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === currentCategory
    );
  }

  filtered = filtered.filter((p) =>
    (p.name + p.category).toLowerCase().includes(search.toLowerCase())
  );

  /* ── Add to cart ── */
  const handleAdd = (product) => {
    if (!addToCart) return;

    const exists = cart.find((p) => p.id === product.id);

    setToast({
      id:   product.id,
      name: exists
        ? `${product.name} quantity updated`
        : `${product.name} added to cart`,
    });

    addToCart((prev = []) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() =>
      setAdded((prev) => ({ ...prev, [product.id]: false })), 1200
    );

    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const totalInCart = cart.reduce((s, p) => s + (p.qty || 1), 0);

  return (
    <>
      <div className="shop-page">
        {/* ── Toast ── */}
       {toast && (
  <div className={`shop-toast show`}>
    <span className="toast-icon">✓</span>
    <span>{toast.name}</span>
  </div>
)}

        {/* ── Page header ── */}
        <div className="shop-header">
          <div>
            <p className="shop-eyebrow">Our Collection</p>
            <h1 className="shop-title">
              {currentCategory === "all"
                ? "All Products"
                : currentCategory
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
            </h1>
            <p className="shop-count">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link to="/cart" className="cart-badge-link">
            <div className="cart-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9"  cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalInCart > 0 && (
                <span className="cart-count">{totalInCart}</span>
              )}
            </div>
          </Link>
        </div>

        {/* ── Toolbar ── */}
        <div className="shop-toolbar">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          <div className="view-toggle">
            <button
              className={`vbtn ${view === "grid" ? "vbtn-active" : ""}`}
              onClick={() => setView("grid")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3"  y="3"  width="7" height="7" rx="1"/>
                <rect x="14" y="3"  width="7" height="7" rx="1"/>
                <rect x="3"  y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button
              className={`vbtn ${view === "list" ? "vbtn-active" : ""}`}
              onClick={() => setView("list")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="8"  y1="6"  x2="21" y2="6"/>
                <line x1="8"  y1="12" x2="21" y2="12"/>
                <line x1="8"  y1="18" x2="21" y2="18"/>
                <line x1="3"  y1="6"  x2="3.01" y2="6"/>
                <line x1="3"  y1="12" x2="3.01" y2="12"/>
                <line x1="3"  y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Category pills ── */}
        <div className="cat-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${
                (cat === "All"
                  ? currentCategory === "all"
                  : currentCategory === cat.toLowerCase())
                  ? "cat-active"
                  : ""
              }`}
              onClick={() =>
                cat === "All"
                  ? navigate("/products")
                  : navigate(`/products/${cat.toLowerCase().replace(/ /g, "-")}`)
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid / List ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌾</div>
            <h3>No products found</h3>
            <button
              className="btn-reset"
              onClick={() => { setSearch(""); navigate("/products"); }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`product-grid ${view === "list" ? "list-view" : ""}`}>
            {filtered.map((item, i) => {
              const inCart  = cart.find((p) => p.id === item.id);
              const isAdded = added[item.id];
              const qty     = inCart?.qty || 0;

              return (
                <div
                  className="product-card"
                  key={item.id}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {item.badge && <span className="prod-badge">{item.badge}</span>}
                  {qty > 0 && <span className="qty-badge">{qty} in cart</span>}

                  <Link to={`/product/${item.id}`} className="prod-img-wrap">
                    <img src={item.image} alt={item.name} className="prod-img" />
                  </Link>

                  <div className="prod-info">
                    <span className="prod-cat">{item.category}</span>
                    <Link to={`/product/${item.id}`} className="prod-name-link">
                      <h4 className="prod-name">{item.name}</h4>
                    </Link>

                    <div className="prod-footer" style={{ justifyContent: 'flex-end' }}>
                      {/* Price removed from here */}
                      <button
                        className={[
                          "add-btn",
                          isAdded ? "add-btn-done"   : "",
                          qty > 0  ? "add-btn-incart" : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() => handleAdd(item)}
                      >
                        {isAdded ? (
                          <><span className="add-check">✓</span> Added</>
                        ) : qty > 0 ? (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="12" y1="5"  x2="12" y2="19"/>
                              <line x1="5"  y1="12" x2="19" y2="12"/>
                            </svg>
                            {qty}
                          </>
                        ) : (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <circle cx="9"  cy="21" r="1"/>
                              <circle cx="20" cy="21" r="1"/>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}