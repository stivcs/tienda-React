import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const URIADMIN = 'https://utpitosbackend.onrender.com/users/3/'; // Aquí se define la URL para hacer las peticiones al admin

const EditAdmin = () => {
    const [password, setPassword] = useState(''); // Estado para guardar la contraseña
    const [adress, setAdress] = useState(''); // Estado para guardar la nueva dirección
    const [telephone, setTelephone] = useState(''); // Estado para guardar el nuevo teléfono
    const [email, setEmail] = useState(''); // Estado para guardar el nuevo email
    const navigate = useNavigate(); // Función para navegar a través de las rutas de react-router-dom
    const navigateShop = () => {
        navigate(`/editInventory`); // Función que redirecciona a la página de editar inventario
    }

    const update = async (e) => { // Función asincrónica para realizar la actualización del admin
        e.preventDefault();
        await axios.put(URIADMIN, { password: password, adress: adress, telephone: telephone, email: email }); // Petición PUT para actualizar los datos del admin
        navigateShop(); // Llama a la función para redireccionar a la página de editar inventario
    }

    return (
        <div className="register-form"> {/* Formulario que solicita la información del admin para cambiar sus datos */}
            <h2>Edit Profile</h2>
            <form onSubmit={update} action="/auth" method="post">
                <input 
                value={password}
                onChange={ (e) => setPassword((e.target.value))}
                type="password" name="pass" id="pass" placeholder="password"/> {/* Campo para ingresar la contraseña */}
                <input 
                value={adress}
                onChange={ (e) => setAdress(e.target.value)}
                type="text" name="pass" id="pass" placeholder="adress"/> {/* Campo para ingresar la dirección */}
                <input 
                value={telephone}
                onChange={ (e) => setTelephone(e.target.value)}
                type="text" name="pass" id="pass" placeholder="telephone"/> {/* Campo para ingresar el teléfono */}
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                type="text" name="pass" id="pass" placeholder="email"/> {/* Campo para ingresar el email */}
                <input type="submit" className="btn-login" value="Edit" /> {/* Botón para enviar el formulario */}
            </form>
        </div>
    )
}

export default EditAdmin;
