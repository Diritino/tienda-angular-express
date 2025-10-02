    const express = require('express');
    const cors = require('cors'); // <-- IMPORTANTE
    const app = express();
    const PORT = 3000;

    app.use(cors()); // <-- HABILITAR CORS
    app.use(express.json());

    let productos = [
    { id: 1, nombre: 'Producto A', precio: 10 },
    { id: 2, nombre: 'Producto B', precio: 15 },
    ];

    // CRUD básico
    app.get('/productos', (req, res) => res.json(productos));
    app.post('/productos', (req, res) => {
    const nuevo = { id: productos.length + 1, ...req.body };
    productos.push(nuevo);
    res.json(nuevo);
    });
    app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    if (index >= 0) {
        productos[index] = { id, ...req.body };
        res.json(productos[index]);
    } else res.status(404).json({ error: 'Producto no encontrado' });
    });
    app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(p => p.id !== id);
    res.json({ mensaje: 'Producto eliminado' });
    });

    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
