//importamos el modelo
import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../main.js";
import { sendMail } from "../mail/mail.js";

//mostrar todos los registros
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();  // Obtenemos todos los registros de productos
        res.json(products);  // Devolvemos los productos como respuesta en formato JSON
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//mostrar un registro
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findAll({
            where: { id: req.params.id }  // Filtramos por el ID del producto solicitado
        });
        res.json(product[0]);  // Devolvemos el primer producto encontrado como respuesta en formato JSON
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

// crear un registro
export const createProduct = async (req, res) => {
    try {
        await ProductModel.create(req.body);  // Creamos un nuevo producto con los datos recibidos en el cuerpo de la solicitud
        res.json({
            'message': 'registro creado'  // Devolvemos un mensaje indicando que el registro fue creado exitosamente
        });
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//actualizar registro
export const updateProducts = async (req, res) => {
    try {
        await ProductModel.update(req.body, {
            where: { id: req.params.id }  // Actualizamos el producto con el ID especificado utilizando los datos recibidos en el cuerpo de la solicitud
        });
        res.json({
            'message': 'registro actualizado'  // Devolvemos un mensaje indicando que el registro fue actualizado exitosamente
        });
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//eliminar registro
export const deleteProduct = async (req, res) => {
    try {
        await ProductModel.destroy({
            where: { id: req.params.id }  // Eliminamos el producto con el ID especificado
        });
        res.json({
            'message': 'registro borrado'  // Devolvemos un mensaje indicando que el registro fue borrado exitosamente
        });
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//reservar o no reservar productos por medio de un click al carrito
export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.f === 'unbook') {
            productsStock[req.params.id]++;  // Aumentamos la cantidad del producto en el carrito
            return res.json('Unbooked');  // Devolvemos una respuesta indicando que el producto fue desreservado
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout');  // Si la cantidad del producto es cero, devolvemos una respuesta indicando que no hay stock
            productsStock[req.params.id]--;  // Reducimos la cantidad del producto en el carrito
            return res.json('Booked');  // Devolvemos una respuesta indicando que el producto fue reservado
        }
        res.status(400).json('Bad request');  // Si la solicitud es inválida, devolvemos un código de estado 400 y un mensaje de error
    } catch (error) {
        res.json({ message: error.message });  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}

//Se actualiza el contenido de la base de datos
const updateContent = async (product, quantity) => {
    const stock = await ProductModel.findAll({
        attributes: ['id', 'stock'],
        where: { id: product }  // Obtenemos el stock del producto con el ID especificado
    });
    console.log(quantity);
    await ProductModel.update({ stock: stock[0].dataValues.stock - quantity[product] }, {
        where: { id: product }  // Actualizamos el stock del producto restando la cantidad especificada
    });
    if (productMinStock[product].stockMin >= (stock[0].dataValues.stock - quantity[product])) {
        sendMail({id: product});
    }
}

//Se compran los productos y se usa updatecontent para actualizar el contenido de cada uno
export const buyProducts = async (req, res) => {
    try {
        console.log(typeof(req.body));
        Object.keys(req.body).forEach(product => updateContent(product, req.body));  // Actualizamos el contenido de la base de datos para cada producto comprado
        res.json("Successful purchase");  // Devolvemos un mensaje indicando que la compra fue exitosa
    } catch (error) {
        res.json(error.message);  // Devolvemos un mensaje de error en caso de que ocurra una excepción
    }
}
