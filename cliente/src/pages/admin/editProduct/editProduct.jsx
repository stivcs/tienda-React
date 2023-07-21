import React from 'react';
import { Product } from './Product';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import "./editProduct.css"

const URI = 'https://utpitosbackend.onrender.com/products/'; // Aquí se especifica la URL para hacer las peticiones.

export const EditProduct = () => {
    const [products, setProducts] = useState([]); // Aquí se inicializa el estado para almacenar los productos.

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => { // Esta función hace una solicitud para obtener los productos desde la URL especificada.
        const res = await axios.get(URI);
        setProducts(res.data);
    };

    return (
        <div className="shop"> {/* Un contenedor con la clase CSS "shop" */}
            <div className="shopTitle">
                <h1>Edit Products</h1> {/* Título para la sección de edición de productos */}
            </div>
            <div className="products">
                {/* Se mapea el arreglo de productos y se renderiza un componente "Product" para cada uno */}
                {products.map((product) => (
                    <Product data={product} />
                ))}
            </div>
        </div>
    );
};
