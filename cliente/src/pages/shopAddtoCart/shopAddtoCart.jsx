import React from 'react';
import { Product } from './productAddtoCart'; // Importamos el componente Product desde el archivo productAddtoCart
import './shopAddtoCart.css'; // Importamos el archivo CSS para los estilos del componente
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP
import { useState } from 'react'; // Importamos el hook useState de React
import { useEffect } from 'react'; // Importamos el hook useEffect de React


const URI = 'https://utpitosbackend.onrender.com/products/'; // Definimos la URL de la API donde se obtienen los productos

export const ShopAddtoCart = () => { // Exportamos el componente funcional ShopAddtoCart como una constante.

    const[products, setProducts] = useState([])// Aqui se guardan todos los productos, inicializando products como un array vacio.
    // Utilizamos el hook useState para crear el estado products y la función setProducts para actualizarlo.
    useEffect(() => { // Utilizamos el hook useEffect para ejecutar la función getProducts cuando el componente se monta por primera vez.
        getProducts()
    }, []);

    const getProducts = async () => {// Aqui se hace la solicitud usando axios, pero definiendo que la funcion sea asincrona y se ejecute por detras del codigo
        const res = await axios.get(URI)  // Realizamos una solicitud GET a la API para obtener los productos
        setProducts(res.data) // Actualizamos el estado 'products' con los datos obtenidos de la API
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Nouveautes</h1>
            </div>
            <div className="products"> 
                {products.map((product) => ( // Para cada producto en el estado products, renderizamos el componente Product pasando los datos del producto como propiedades.
                    <Product data={product} />// Aqui por todo el arreglo de productos se imprimen los productos
                ))}
            </div>
        </div>
    )
};