import React, { createContext, useState } from 'react';  // Importamos los módulos necesarios de React
import axios from 'axios';  // Importamos axios para realizar peticiones al servidor
import { useEffect } from 'react';  // Importamos useEffect para realizar operaciones después de renderizar el componente

export const ShopContext = createContext(null);  // Creamos el contexto para compartir los datos y funciones del carrito
const URI = 'https://utpitosbackend.onrender.com/products/';  // Ruta a la cual se realizarán las peticiones para obtener los productos

const getDefaultCart = () => {  // Función para obtener un carrito inicial vacío
    let cart = {};
    for (let i = 1; i < 12; i++) {
        cart[i] = 0;  // Se crea un objeto donde cada posición representa un producto y su valor es la cantidad en el carrito (comienza en 0)
    }
    return cart;
};

export const ShopContextProvider = (props) => {  // Componente proveedor del contexto
    const [cartItems, setCartItems] = useState(getDefaultCart());  // Estado para almacenar los productos ingresados en el carrito
    const [payAumount, setPayAumount] = useState(0);  // Estado para almacenar el monto total de la compra

    const [products, setProducts] = useState([]);  // Estado para almacenar los productos obtenidos de la base de datos
    useEffect(() => {
        getProducts();
    }, []);  // Realizar la petición para obtener los productos al cargar el componente por primera vez

    const [logged, setLogged] = useState(0);  // Estado para verificar si hay un usuario logeado en la página
    const loggedChanger = (value) => setLogged(value);  // Función para cambiar el valor de "logged"

    const [admin, setAdmin] = useState(false);  // Estado para verificar si el usuario es un administrador (por defecto, falso)
    const AdminChanger = (value) => setAdmin(value);  // Función para cambiar el valor de "admin"

    const getProducts = async () => {  // Función para obtener todos los productos de la base de datos
        const res = await axios.get(URI);  // Realizar la petición GET a la ruta de los productos
        setProducts(res.data);  // Almacenar los productos obtenidos en el estado "products"
    };

    const getTotalCartAmount = () => {  // Función para obtener el monto total de la compra
        let totalAmount = 0;  // Inicializar el monto total en 0
        for (const item in cartItems) {  // Recorrer cada producto en el carrito
            if (cartItems[item] > 0) {  // Si la cantidad de un producto en el carrito es mayor a 0
                let itemInfo = products.find((product) => product.id === Number(item));  // Obtener la información del producto (precio) que corresponde al producto en el estado "products"
                totalAmount += cartItems[item] * itemInfo.precio;  // Calcular el monto total sumando el precio del producto multiplicado por la cantidad en el carrito
            }
        }
        return totalAmount;  // Retornar el monto total de la compra
    };

    const addToCart = async (itemId) => {  // Función para agregar un producto al carrito
        await axios.get(`https://utpitosbackend.onrender.com/products/book/${itemId}?f=book`)  // Realizar una petición GET para reservar el producto en el servidor
            .then(({ data }) => {
                data === 'Booked' ? setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })) : void (0);  // Si el estado retornado es 'Booked', se suma 1 a la cantidad del producto en el carrito
                data === 'Stockout' ? alert('Empty product') : void (0);  // Si el estado retornado es 'Stockout', se muestra una alerta indicando que el producto está vacío
            })
            .catch(error => {
                console.log(error.message);  // Si ocurre un error, se muestra en la consola
            });
    };

    const removeFromCart = async (itemId) => {  // Función para eliminar un producto del carrito
        await axios.get(`https://utpitosbackend.onrender.com/products/book/${itemId}?f=unbook`)  // Realizar una petición GET para eliminar la reserva del producto en el servidor
            .then(({ data }) => {
                data === 'Unbooked' ? setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })) : void (0);  // Si el estado retornado es 'Unbooked', se resta 1 a la cantidad del producto en el carrito
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const contextValue = { cartItems, addToCart, removeFromCart, getTotalCartAmount, loggedChanger, logged, AdminChanger, admin, payAumount, setPayAumount };  // Valores y funciones a compartir en el contexto
    return (
        <ShopContext.Provider value={contextValue}>  
            {props.children} 
        </ShopContext.Provider>
    );
};
