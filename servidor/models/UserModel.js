import db from "../database/db.js";  // Se importa la conexión a la base de datos para extraer información

import { DataTypes } from "sequelize";  // Se importa el tipo de dato extraído de la base de datos

// El modelo de todos los usuarios extrayendo todos sus campos
const UserModel = db.define('users', {
    user_name: { type: DataTypes.STRING },  // Campo "user_name" de tipo string
    password: { type: DataTypes.STRING },  // Campo "password" de tipo string
    adress: { type: DataTypes.STRING },  // Campo "adress" de tipo string
    telephone: { type: DataTypes.STRING },  // Campo "telephone" de tipo string
    email: { type: DataTypes.STRING },  // Campo "email" de tipo string
});

export default UserModel;  // Exportamos el modelo de usuarios para poder utilizarlo en otros archivos
