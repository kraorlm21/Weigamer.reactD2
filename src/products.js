import { useEffect, useState, useMemo } from "react";

export default function Products({ onAdd, cart }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    document.title = "Weigamer • Productos";
    
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error("Error al cargar productos:", error));

  }, []);
// ...
  const qtyById = useMemo(() => {
    const m = {};
    (cart ?? []).forEach((it) => (m[it.id] = it.qty));
    return m;
  }, [cart]);

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Productos</h1>
      <p style={styles.subtitle}>Lista completa de consolas en venta.</p>

      <div style={styles.grid}>
        {products.map((prod) => {
          const qty = qtyById[prod.id] ?? 0;
          const atMax = qty >= (prod.stock ?? 99);

          return (
            <article key={prod.id} style={styles.card}>
              <img src={`/img/${prod.img}`} alt={prod.name} loading="lazy" style={styles.image} />
              <h3 style={styles.name}>{prod.name}</h3>
              <p style={{ color: "#a3b3c9", minHeight: 36 }}>{prod.desc}</p>

              <div style={styles.infoRow}>
                <span style={{ ...styles.badge, backgroundColor: prod.category === "Retro" ? "#2f2040" : "#1e4033" }}>
                  {prod.category}
                </span>
                <b style={styles.price}>{prod.price.toFixed(2)} USD</b>
              </div>

              <button
                onClick={() => onAdd?.(prod)}
                disabled={atMax}
                title={atMax ? "Stock máximo alcanzado" : "Añadir al carrito"}
                style={{
                  ...styles.button,
                  ...(atMax ? { backgroundColor: "#374151", color: "#9ca3af", cursor: "not-allowed" } : null),
                }}
              >
                {atMax ? "Sin stock" : qty > 0 ? `Añadir (+1)` : "Añadir"}
              </button>

              <div style={{ color: "#a3b3c9", fontSize: 12, marginTop: 6 }}>
                {qty > 0 ? `En carrito: ${qty}/${prod.stock}` : `Stock: ${prod.stock}`}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", color: "#fff" },
  title: { fontSize: "2rem", fontWeight: 700, marginBottom: ".3rem" },
  subtitle: { color: "#a3b3c9", marginBottom: "2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#111827", borderRadius: 14, padding: "1rem", boxShadow: "0 0 15px rgba(0,0,0,0.4)" },
  image: { width: "100%", height: 160, objectFit: "cover", borderRadius: 10, marginBottom: ".8rem" },
  name: { fontSize: "1.05rem", fontWeight: 600, marginBottom: ".4rem" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  badge: { fontSize: ".8rem", padding: "4px 10px", borderRadius: 999, color: "#cfd6e6" },
  price: { color: "#9ee0b5" },
  button: { width: "100%", backgroundColor: "#10b981", color: "#0b0f15", border: "none", padding: ".55rem 0", fontWeight: 700, borderRadius: 10, cursor: "pointer" },
};
