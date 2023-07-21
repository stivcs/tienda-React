import React from "react";
import './register.css'; // Modifica los estilos del componente Register utilizando estilos definidos en el archivo "register.css".
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

const URI = 'https://utpitosbackend.onrender.com/users/'; // Modifica la dirección en la que se realizan las peticiones.

const Register = () => {
    const [name, setName] = useState(''); // Modifica el valor del estado "name".
    const [password, setPassword] = useState(''); // Modifica el valor del estado "password".
    const [adress, setAdress] = useState(''); // Modifica el valor del estado "adress".
    const [telephone, setTelephone] = useState(''); // Modifica el valor del estado "telephone".
    const [email, setEmail] = useState(''); // Modifica el valor del estado "email".
    const [users, setUsers] = useState([]); // Modifica el valor del estado "users".
    const navigate = useNavigate(); // Modifica el valor de la variable "navigate" utilizando el hook "useNavigate".

    const navigateLogin = () => {
        navigate(`/login`); // Modifica la ruta a la que se navega al invocar esta función.
    }

    const navigateRegister = () => {
        navigate(`/register`); // Modifica la ruta a la que se navega al invocar esta función.
    }

    useEffect(() => {
        getUsers(); // Modifica el comportamiento del efecto cuando se monta el componente.
    }, [])

    const getUsers = async() => { // Modifica el método "getUsers" para obtener usuarios de alguna fuente externa.
        const res = await axios.get(URI); // Modifica la URL de la petición.
        setUsers(res.data); // Modifica el valor del estado "users".
    }

    const store = async (e) => { // Modifica el método "store" para realizar una acción de almacenamiento o envío de datos.
        e.preventDefault();
        await axios.post(URI, {user_name: name, password: password, adress: adress, telephone: telephone, email: email }); // Modifica la URL de la petición y los datos que se envían.
        navigateLogin(); // Modifica la ruta a la que se navega después de realizar la acción de almacenamiento.
    }

    return (
        <div className="register-form"> {/* Modifica la clase del elemento contenedor */}
            <h2>register</h2>
            <form onSubmit={store} action="/auth" method="post"> {/* Modifica el método y la acción del formulario */}
                <input 
                value={name}
                onChange={ (e) => users.find(event => event.username === e.target.value) ? navigateRegister() : setName(e.target.value)} // Modifica el valor y el comportamiento del campo de entrada "name".
                type="text" name="user" id="user" placeholder="user"/>
                <input 
                value={password}
                onChange={ (e) => setPassword((e.target.value))} // Modifica el valor y el comportamiento del campo de entrada "password".
                type="password" name="pass" id="pass" placeholder="password"/>
                <input 
                value={adress}
                onChange={ (e) => setAdress(e.target.value)} // Modifica el valor y el comportamiento del campo de entrada "adress".
                type="text" name="pass" id="pass" placeholder="adress"/>
                <input 
                value={telephone}
                onChange={ (e) => setTelephone(e.target.value)} // Modifica el valor y el comportamiento del campo de entrada "telephone".
                type="text" name="pass" id="pass" placeholder="telephone"/>
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)} // Modifica el valor y el comportamiento del campo de entrada "email".
                type="text" name="pass" id="pass" placeholder="email"/>
                <input type="submit" className="btn-login" value="register" />
            </form>
        </div>
    )
}

export default Register;
