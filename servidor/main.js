import Express from 'express';  // Se importa Express para la conexión con la API
import cors from 'cors';  // Intercambio de recursos de origen cruzado, permite evitar errores
import db from './database/db.js';  // Conexión a la base de datos
import productRoutes from './routes/routesProducts.js';  // Rutas de los productos
import userRoutes from './routes/routesUser.js';  // Rutas de los usuarios
import ProductModel from './models/ProductModel.js';  // Modelo de los productos
import { pay } from './routes/pay.js';  // Ruta para realizar pagos
const app = Express();  // La app se conecta con Express

app.use(cors());  // Se utiliza cors para prevenir fallas de conexión
app.use(Express.json());  // Permite obtener el paquete Express en formato JSON
app.use('/products', productRoutes);  // Se establecen las rutas para los productos
app.use('/users', userRoutes);  // Se establecen las rutas para los usuarios
app.use('/payment', pay);  // Se establecen las rutas para los pagos

// Se busca conectar a la base de datos
try {
    db.authenticate();
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.log(`Error de conexión: ${error}`);
}

const PORT = process.env.PORT || 3001;  // Conexión al servidor backend

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Información sobre dónde se está ejecutando el servidor
});

// Usando el modelo de productos, se encuentran todos los productos y se devuelven sus atributos correspondientes, guardándolos en el objeto "products"
const products = await ProductModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'nombre']
});

let productsStock = {};  // Objeto para guardar el stock máximo de los productos
let productMinStock = {};  // Objeto para guardar el stock mínimo de los productos

// Para cada producto obtenido
products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;  // Se asigna el ID correspondiente al producto y su valor de stock al objeto "productsStock"
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = { stockMin: product.dataValues.stockMin, nombre: product.dataValues.nombre };  // Se asigna el ID correspondiente al producto y su valor mínimo de stock al objeto "productMinStock", junto con el nombre
});
console.log(productMinStock);
export { productsStock, productMinStock };  // Exportación de los objetos
