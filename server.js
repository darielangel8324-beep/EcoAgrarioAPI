const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Permite recibir información en formato JSON.
app.use(express.json());

// Conexión con la base de datos MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/ecoagrario')
    .then(() => {
        console.log('Conexión con MongoDB establecida correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
    });

// Ruta inicial para comprobar que la API está funcionando.
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de EcoAgrario funcionando correctamente'
    });
});

// Rutas para registro y autenticación de usuarios.
app.use('/api/auth', authRoutes);

// Inicia el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});