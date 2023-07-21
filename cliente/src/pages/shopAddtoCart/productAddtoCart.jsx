import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context"; // Extrae el contexto de la tienda

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img1, img2, img3 } = props.data; // Extrae las propiedades de los datos del producto
    const { addToCart, cartItems } = useContext(ShopContext); // Obtiene la función addToCart y el estado cartItems del contexto

    const cartItemAmount = cartItems[id]; // Obtiene la cantidad de este producto en el carrito
    return (
        <div className="product">
            <div className="slide-var"> {/* Sección del carrusel */}
                <ul>
                    <li><img src={img1} alt={nombre} /></li>
                    <li><img src={img2} alt={nombre} /></li>
                    <li><img src={img3} alt={nombre} /></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p> {/* Muestra la descripción del producto */}
            </div>
            <div className="description">
                <p>
                    <b>{nombre}</b> {/* Muestra el nombre del producto en negrita */}
                </p>
                <p>${precio}</p> {/* Muestra el precio del producto */}
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}> {/* Botón "Agregar al carrito" */}
                Add To Cart{cartItemAmount > 0 && <> ({cartItemAmount})</>} {/* Muestra la cantidad de este producto en el carrito si es mayor que 0 */}
            </button>
        </div>
    );
};
