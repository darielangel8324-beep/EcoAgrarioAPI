const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');

const app = express();
const PORT = 3000;

// Permitir que la API reciba datos en formato JSON
app.use(express.json());

// Conexión con la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecoagrario')
    .then(() => {
        console.log('Conexión con MongoDB establecida correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
    });

// Ruta principal de la API
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de EcoAgrario funcionando correctamente'
    });
});

// Conexión de las rutas de autenticación
app.use('/api/auth', authRoutes);

// Conexión de las rutas de productos
app.use('/api/productos', productosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});