import express from "express";  // Se importa express para facilitar la comunicación con el servidor
import { bookProduct, buyProducts, getAllProducts, getProduct, createProduct, updateProducts, deleteProduct } from "../controllers/ProductControllers.js";  // Se importan todos los controladores ya creados para ser utilizados
const router = express.Router();

// Generación de rutas para usar la API creada e interactuar con la base de datos
// Diferentes rutas a usar con las diferentes funcionalidades
router.get('/', getAllProducts);  // Ruta para obtener todos los productos
router.put('/buy', buyProducts);  // Ruta para comprar productos
router.get('/book/:id', bookProduct);  // Ruta para reservar o liberar la reserva de un producto específico
router.get('/:id', getProduct);  // Ruta para obtener un producto específico
router.post('/', createProduct);  // Ruta para crear un nuevo producto
router.put('/:id', updateProducts);  // Ruta para actualizar un producto específico
router.delete('/:id', deleteProduct);  // Ruta para eliminar un producto específico

export default router;
