// server.js (Backend API con Node.js y Express)
const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 5000; // El backend usará el puerto 5000, diferente del frontend (usualmente 3000)

// --- Mock Data (Datos de productos tomados de src/products.js) ---
const products = [
  { id: "SWITCH-OLED", name: "Nintendo Switch OLED", price: 349.99, category: "Actual", stock: 15, img: "oled.png", desc: "Consola híbrida con pantalla OLED 7”." },
  { id: "PS5-SLIM", name: "PlayStation 5 Slim", price: 499.99, category: "Actual", stock: 10, img: "slim.png", desc: "Gráficos de última generación y SSD ultrarrápido." },
  { id: "XSX", name: "Xbox Series X", price: 499.99, category: "Actual", stock: 9, img: "seriesx.png", desc: "Potencia de sobremesa con 4K sólido." },
  { id: "GBA-SP", name: "Game Boy Advance SP", price: 129.99, category: "Retro", stock: 7, img: "boy.png", desc: "Portátil clásica retroiluminada, plegable." },
  { id: "N64", name: "Nintendo 64", price: 159.0, category: "Retro", stock: 5, img: "64.png", desc: "Mítica consola de 64 bits." },
  { id: "PS2", name: "PlayStation 2", price: 149.0, category: "Retro", stock: 8, img: "play2.png", desc: "La consola más vendida de la historia." }
];

// --- Middlewares ---
// Permite peticiones del frontend (si corre en localhost:3000)
app.use(cors()); 
// Permite que el servidor entienda el body de las peticiones JSON
app.use(express.json()); 

// ===================================
//              ENDPOINTS
// ===================================

/** * GET /api/products
 * Obtiene la lista de productos. 
 */
app.get('/api/products', (req, res) => {
  console.log('GET /api/products solicitado');
  // Simulamos un pequeño retraso de red
  setTimeout(() => {
    res.status(200).json(products);
  }, 500);
});


/** * POST /api/register
 * Simula el registro de un nuevo usuario en la base de datos.
 */
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  // --- Lógica real de guardado en DB (SIMULADA) ---
  console.log(`Usuario registrado (simulado): ${email}`);
  
  // Simulamos un pequeño retraso de red
  setTimeout(() => {
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente.',
      email: email 
    });
  }, 800);
});

/**
 * POST /api/checkout
 * Simula el procesamiento de una compra real.
 */
app.post('/api/checkout', (req, res) => {
    const { items, total } = req.body;
    
    // Aquí iría la lógica de procesamiento de pago con Stripe/PayPal y la reducción de stock real.
    console.log(`Procesando compra simulada. Total: ${total} USD. Items: ${items.length}`);

    // Simulamos un pequeño retraso de red
    setTimeout(() => {
        res.status(200).json({ 
            message: 'Compra procesada con éxito (simulación de backend). ¡Gracias!',
            transactionId: Date.now() 
        });
    }, 1000);
});


// --- Inicio del servidor ---
app.listen(PORT, () => {
  console.log(`Servidor de Weigamer Backend simulado escuchando en http://localhost:${PORT}`);
});