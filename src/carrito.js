import { Link } from "react-router-dom";

const money = (n) => `${n.toFixed(2)} USD`;

export default function Carrito({ items, increment, decrement, removeItem, clear, total }) {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: 8 }}>Tu carrito</h1>

      {items.length === 0 ? (
        <div style={emptyStyles.wrap}>
          <p style={{ color: "#a3b3c9" }}>Aún no tienes productos.</p>
          <Link to="/products" style={emptyStyles.btn}>Ir a productos</Link>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
            {items.map((it) => (
              <div key={it.id} style={rowStyles.row}>
                <img
                  src={`/img/${it.img}`}
                  alt={it.name}
                  style={rowStyles.image}
                  loading="lazy"
                />
                <div style={{ flex: 1 }}>
                  <div style={rowStyles.top}>
                    <strong>{it.name}</strong>
                    <span style={{ color: "#9ee0b5" }}>{money(it.price)}</span>
                  </div>
                  <div style={rowStyles.actions}>
                    <div style={rowStyles.qtyBox}>
                      <button onClick={() => decrement(it.id)} style={rowStyles.qtyBtn}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => increment(it.id)} style={rowStyles.qtyBtn}>＋</button>
                    </div>
                    <button onClick={() => removeItem(it.id)} style={rowStyles.removeBtn}>Quitar</button>
                  </div>
                </div>
                <div style={{ minWidth: 90, textAlign: "right" }}>
                  <div style={{ color: "#a3b3c9", fontSize: 12 }}>Subtotal</div>
                  <div><b>{money(it.price * it.qty)}</b></div>
                </div>
              </div>
            ))}
          </div>

          <div style={footerStyles.bar}>
            <button onClick={clear} style={footerStyles.clear}>Vaciar</button>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#a3b3c9" }}>Total</span>
              <strong style={{ fontSize: "1.2rem" }}>{money(total)}</strong>
              <button
                style={footerStyles.checkout}
                onClick={() => alert("Compra simulada (demo).")}
              >
                Pagar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const rowStyles = {
  row: { display: "flex", gap: 12, alignItems: "center", background: "#111827", borderRadius: 12, padding: 10 },
  image: { width: 72, height: 72, objectFit: "cover", borderRadius: 10 },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  actions: { display: "flex", alignItems: "center", gap: 12 },
  qtyBox: { display: "inline-flex", gap: 10, alignItems: "center", background: "#0d1320", border: "1px solid #1f2937", borderRadius: 10, padding: "4px 8px" },
  qtyBtn: { background: "transparent", color: "#cfd6e6", border: "none", fontSize: 18, cursor: "pointer", width: 24 },
  removeBtn: { background: "#1f2937", color: "#cfd6e6", border: "none", padding: ".4rem .7rem", borderRadius: 10, cursor: "pointer" },
};

const footerStyles = {
  bar: { display: "flex", alignItems: "center", gap: 12, background: "#0d1320", border: "1px solid #1f2937", borderRadius: 12, padding: 12 },
  clear: { background: "#1f2937", color: "#cfd6e6", border: "none", padding: ".55rem .9rem", borderRadius: 10, cursor: "pointer" },
  checkout: { background: "#10b981", color: "#0b0f15", border: "none", padding: ".6rem 1rem", borderRadius: 10, fontWeight: 800, cursor: "pointer" },
};

const emptyStyles = {
  wrap: { background: "#0d1320", border: "1px solid #1f2937", borderRadius: 12, padding: 16 },
  btn: { marginTop: 8, display: "inline-block", background: "#10b981", color: "#0b0f15", textDecoration: "none", padding: ".55rem .9rem", borderRadius: 10, fontWeight: 700 }
};
