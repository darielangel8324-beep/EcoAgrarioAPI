const express = require('express');
const Usuario = require('../models/Usuario');

const router = express.Router();

// Ruta para registrar un nuevo usuario.
router.post('/registro', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Verifica que se hayan enviado los datos necesarios.
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Comprueba si el usuario ya existe.
        const usuarioExistente = await Usuario.findOne({ usuario });

        if (usuarioExistente) {
            return res.status(409).json({
                error: 'El usuario ya está registrado'
            });
        }

        // Guarda el nuevo usuario en MongoDB.
        const nuevoUsuario = new Usuario({
            usuario,
            contrasena
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al registrar el usuario'
        });
    }
});

// Ruta para iniciar sesión.
router.post('/login', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Verifica que se hayan enviado los datos necesarios.
        if (!usuario || !contrasena) {
            return res.status(400).json({
                error: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Busca el usuario en MongoDB.
        const usuarioEncontrado = await Usuario.findOne({ usuario });

        // Comprueba las credenciales.
        if (!usuarioEncontrado ||
            usuarioEncontrado.contrasena !== contrasena) {
            return res.status(401).json({
                error: 'Error en la autenticación'
            });
        }

        res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al realizar la autenticación'
        });
    }
});

module.exports = router;