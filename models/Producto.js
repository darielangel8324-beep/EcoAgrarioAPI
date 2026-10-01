const mongoose = require('mongoose');

// Definición de la estructura de los productos de EcoAgrario
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['activo', 'reservado', 'agotado'],
        default: 'activo'
    }
});

// Creación del modelo Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;