import db from "../database/db.js";  // Se importa la conexión a la base de datos

import { DataTypes } from "sequelize";  // Se importa el tipo de datos para cada atributo de la base de datos

// El modelo de todos los productos extrayendo todos sus campos
const ProductModel = db.define('productos', {
    nombre: { type: DataTypes.STRING },  // Campo "nombre" de tipo string
    precio: { type: DataTypes.NUMBER },  // Campo "precio" de tipo number
    descripcion: { type: DataTypes.TEXT },  // Campo "descripcion" de tipo texto
    img1: { type: DataTypes.TEXT },  // Campo "img1" de tipo texto
    img2: { type: DataTypes.TEXT },  // Campo "img2" de tipo texto
    img3: { type: DataTypes.TEXT },  // Campo "img3" de tipo texto
    stockMax: { type: DataTypes.INTEGER },  // Campo "stockMax" de tipo entero
    stockMin: { type: DataTypes.INTEGER },  // Campo "stockMin" de tipo entero
    stock: { type: DataTypes.INTEGER }  // Campo "stock" de tipo entero
});

export default ProductModel;  // Exportamos el modelo de productos para poder utilizarlo en otros archivos
