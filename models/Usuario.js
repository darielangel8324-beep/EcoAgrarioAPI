const mongoose = require('mongoose');

// Define la estructura de los datos de un usuario.
const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    }
});

// Crea el modelo Usuario a partir del esquema.
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;