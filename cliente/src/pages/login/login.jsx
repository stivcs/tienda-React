import React from "react";
import './login.css' // Se importa el archivo CSS para estilizar el componente
import { useNavigate } from "react-router-dom"; // Se importa la función para redireccionar
import axios from "axios"; // Se importa la librería Axios para hacer peticiones HTTP
import { useState, useEffect } from "react"; // Se importa el hook useState y useEffect de React
import { ShopContext } from "../../context/shop-context"; // Se importa el contexto del contexto de la tienda
import { useContext } from "react"; // Se importa la función useContext para acceder al contexto

const URI = 'https://utpitosbackend.onrender.com/users/'; // URL para hacer las peticiones a los usuarios

const Login = () => {
    const context = useContext(ShopContext); // Se obtiene el contexto de la tienda
    const navigate = useNavigate(); // Función para navegar a través de las rutas de react-router-dom

    const navigateRegister = () => {
        navigate(`/register`); // Función que redirecciona a la página de registro
    };

    const navigateShopAddtoCart = () => {
        navigate(`/shop`); // Función que redirecciona a la página de la tienda para agregar al carrito
    };

    const navigateEditInventory = () => {
        navigate(`/editInventory`); // Función que redirecciona a la página de edición de inventario
    };

    const [entrada, setEntrada] = useState(''); // Estado para guardar el valor del campo de usuario
    const [entradaP, setEntradaP] = useState(''); // Estado para guardar el valor del campo de contraseña
    const [users, setUsers] = useState([]); // Estado para guardar los usuarios obtenidos de la API

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(URI); // Petición GET para obtener la lista de usuarios
                console.log(res.data);
                setUsers(res.data); // Se actualiza el estado con los usuarios obtenidos
            } catch (error) {
                console.error(error);
            }
        };

        getUsers(); // Se llama a la función para obtener los usuarios cuando el componente se monta
    }, []);

    const compare = () => {
        if (Array.isArray(users)) {
            return users.find(e => e.user_name === entrada && e.password === entradaP); // Compara el usuario y la contraseña ingresados con los usuarios obtenidos
        }
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (compare()) {
            if (entrada === 'admin') {
                navigateEditInventory(); // Redirecciona a la página de edición de inventario si el usuario es "admin"
                context.AdminChanger(true); // Cambia el estado del contexto para indicar que es un administrador
            } else {
                navigateShopAddtoCart(); // Redirecciona a la página de la tienda para agregar al carrito si es un usuario normal
            }
            context.loggedChanger(true); // Cambia el estado del contexto para indicar que el usuario ha iniciado sesión
        } else {
            navigateLogin(); // Redirecciona a la página de inicio de sesión nuevamente si el inicio de sesión no es válido
        }
    };

    const navigateLogin = () => {
        navigate(`/login`); // Función que redirecciona a la página de inicio de sesión
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)}
                    type="text"
                    name="user"
                    id="user"
                    placeholder="user"
                /> {/* Campo para ingresar el nombre de usuario */}
                <input
                    value={entradaP}
                    onChange={(e) => setEntradaP(e.target.value)}
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="password"
                /> {/* Campo para ingresar la contraseña */}
                <input type="submit" className="btn-login" value="Login" /> {/* Botón para enviar el formulario de inicio de sesión */}
            </form>
            <div href="register" className="btn-register" onClick={navigateRegister}>
                register
            </div> {/* Botón para redireccionar a la página de registro */}
        </div>
    );
};

export default Login;
