import UserModel from "../models/UserModel.js";  // Importamos el modelo de usuario

//Comando para obtener todos los usuarios de forma json
export const getAllUsers = async (req, res) => {
    try {
        const Users = await UserModel.findAll();  // Obtenemos todos los registros de usuarios
        res.json(Users);  // Devolvemos los usuarios como respuesta en formato JSON
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

// Se crea un registro de usuario
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body);  // Creamos un nuevo usuario con los datos recibidos en el cuerpo de la solicitud
        res.json({
            'message': 'registro creado'  // Devolvemos un mensaje indicando que el registro fue creado exitosamente
        });
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//Se actualiza un usuario en especifico
export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where: { id: req.params.id }  // Actualizamos el usuario con el ID especificado utilizando los datos recibidos en el cuerpo de la solicitud
        });
        res.json({
            'message': 'registro actualizado'  // Devolvemos un mensaje indicando que el registro fue actualizado exitosamente
        });
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//Se obtiene un usuario en especifico
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where: { id: req.params.id }  // Filtramos por el ID del usuario solicitado
        });
        res.json(user[0]);  // Devolvemos el primer usuario encontrado como respuesta en formato JSON
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}
