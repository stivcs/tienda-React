import express from "express";  // Se importa express para facilitar la comunicación con el servidor
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js";  // Se importan todos los controladores ya creados para ser utilizados
const router = express.Router();

// Generación de rutas para usar la API creada e interactuar con la base de datos
// Diferentes rutas a usar con las diferentes funcionalidades
router.get('/', getAllUsers);  // Ruta para obtener todos los usuarios
router.get('/:id', getUser);  // Ruta para obtener un usuario específico
router.post('/', createUser);  // Ruta para crear un nuevo usuario
router.put('/:id', updateUser);  // Ruta para actualizar un usuario específico

export default router;
