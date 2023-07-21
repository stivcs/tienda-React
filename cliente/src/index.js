// Importar React desde la biblioteca de React
import React from "react";
// Importar ReactDOM desde la biblioteca de React para el renderizado en el cliente
import ReactDOM from "react-dom/client";
// Importar el componente App desde el archivo "App.js"
import App from "./App";

// Crear una raíz de ReactDOM que se vinculará al elemento con el ID "root" en el documento HTML
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizar el componente App dentro de la raíz de ReactDOM
root.render(
  // Usar el modo estricto de React
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
