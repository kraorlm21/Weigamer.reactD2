import { useEffect, useState, useMemo } from "react";

export default function Products({ onAdd, cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = "Weigamer • Productos";
    const p = [
      { id: "SWITCH-OLED", name: "Nintendo Switch OLED", price: 349.99, category: "Actual", stock: 15, img: "oled.png", desc: "Consola híbrida con pantalla OLED 7”." },
      { id: "PS5-SLIM", name: "PlayStation 5 Slim", price: 499.99, category: "Actual", stock: 10, img: "slim.png", desc: "Gráficos de última generación y SSD ultrarrápido." },
      { id: "XSX", name: "Xbox Series X", price: 499.99, category: "Actual", stock: 9, img: "seriesx.png", desc: "Potencia de sobremesa con 4K sólido." },
      { id: "GBA-SP", name: "Game Boy Advance SP", price: 129.99, category: "Retro", stock: 7, img: "boy.png", desc: "Portátil clásica retroiluminada, plegable." },
      { id: "N64", name: "Nintendo 64", price: 159.0, category: "Retro", stock: 5, img: "64.png", desc: "Mítica consola de 64 bits." },
      { id: "PS2", name: "PlayStation 2", price: 149.0, category: "Retro", stock: 8, img: "play2.png", desc: "La consola más vendida de la historia." }
    ];
    localStorage.setItem("weigamer_products", JSON.stringify(p));
    setProducts(p);
  }, []);

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
