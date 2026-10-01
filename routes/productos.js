const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

// Servicio para publicar un producto
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, cantidad, precio, ubicacion } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!nombre || !descripcion || cantidad === undefined ||
            precio === undefined || !ubicacion) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios'
            });
        }

        // Crear un nuevo producto
        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            cantidad,
            precio,
            ubicacion
        });

        // Guardar el producto en MongoDB
        await nuevoProducto.save();

        res.status(201).json({
            mensaje: 'Producto publicado correctamente',
            producto: nuevoProducto
        });

   } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({
            error: 'Los datos del producto no son válidos',
            detalles: error.message
        });
    }

    res.status(500).json({
        error: 'Error al publicar el producto'
    });
}
});

// Servicio para consultar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();

        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({
            error: 'Error al consultar los productos'
        });
    }
});

// Servicio para buscar productos por nombre
router.get('/buscar/:nombre', async (req, res) => {
    try {
        const nombreBuscado = req.params.nombre;

        const productos = await Producto.find({
            nombre: {
                $regex: nombreBuscado,
                $options: 'i'
            }
        });

        if (productos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron productos'
            });
        }

        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({
            error: 'Error al buscar el producto'
        });
    }
});

module.exports = router;