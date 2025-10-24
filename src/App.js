import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./products";
import Register from "./register";
import Carrito from "./carrito";
import "./App.css";

const ICON_PATH = "/icon.png";
const CART_KEY = "weigamer_cart";

export default function App() {
  useEffect(() => {
    document.title = "Weigamer • Consolas retro y actuales";
  }, []);

  // ===== Carrito =====
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) ?? []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);

  // ===== Toast =====
  const [toast, setToast] = useState({ show: false, msg: "" });
  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: "" }), 1300);
  };

  // helpers
  const getQty = (id) => cart.find((x) => x.id === id)?.qty ?? 0;

  // acciones carrito
  const addToCart = (product) => {
    const current = getQty(product.id);
    const max = product.stock ?? 99;
    if (current >= max) {
      showToast("Stock máximo alcanzado");
      return;
    }
    setCart((prev) => {
      const i = prev.findIndex((it) => it.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(next[i].qty + 1, max) };
        return next;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, img: product.img, stock: max, qty: 1 }];
    });
    showToast("Añadido ✓");
  };

  const increment = (id) =>
    setCart((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.min(it.qty + 1, it.stock ?? 99) } : it
      )
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it)).filter((it) => it.qty > 0)
    );

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const clearCart = () => setCart([]);

  const count = useMemo(() => cart.reduce((a, b) => a + b.qty, 0), [cart]);
  const total = useMemo(() => cart.reduce((a, b) => a + b.price * b.qty, 0), [cart]);

  const Home = () => (
    <div className="container">
      <section className="hero">
        <div>
          <h1 className="title">Weigamer</h1>
          <p className="subtitle">Tienda de consolas <b>retro y actuales</b>. Colecciona recuerdos, juega el presente 🎮</p>
          <div className="header-cta">
            <Link className="btn" to="/products">Ver productos</Link>
            <Link className="btn secondary" to="/register">Registrarse</Link>
          </div>
        </div>
        <div className="card">
          <img src={ICON_PATH} alt="Icono" style={{ width: "100%", maxWidth: 400, borderRadius: ".75rem", border: "1px solid #243074", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }} />
        </div>
      </section>
      <section className="grid products" id="home-products"></section>
    </div>
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <img src={ICON_PATH} alt="Weigamer Logo" style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid #263163" }} />
            <span>Weigamer</span>
          </Link>
          <div className="menu">
            <Link to="/" className="btn secondary">Inicio</Link>
            <Link to="/products" className="btn">Productos</Link>
            <Link to="/register" className="btn">Registro</Link>
            <Link to="/carrito" className="btn" style={{ position: "relative" }}>
              Carrito
              {count > 0 && (
                <span style={{ position: "absolute", top: -6, right: -8, background: "#10b981", color: "#0b0f15", borderRadius: 999, padding: "0 8px", fontWeight: 800, fontSize: 12, lineHeight: "18px", border: "1px solid #0b0f15" }}>
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products onAdd={addToCart} cart={cart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<Carrito items={cart} increment={increment} decrement={decrement} removeItem={removeItem} clear={clearCart} total={total} />} />
      </Routes>

      {/* Toast */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          padding: "10px 14px",
          borderRadius: 10,
          background: toast.msg === "Añadido ✓" ? "#10b981" : "#f59e0b",
          color: toast.msg === "Añadido ✓" ? "#0b0f15" : "#0b0f15",
          fontWeight: 800,
          boxShadow: "0 6px 20px rgba(0,0,0,.35)",
          opacity: toast.show ? 1 : 0,
          transform: `translateY(${toast.show ? 0 : 8}px)`,
          pointerEvents: "none",
          transition: "opacity .18s ease, transform .18s ease",
        }}
      >
        {toast.msg}
      </div>
    </div>
  );
}

