import nodemailer from 'nodemailer';  // Se importa la librería nodemailer que permite el fácil envío de correos

// El transportador, simplemente una receta de cocina en la cual se utiliza el protocolo SMTP (Simple Mail Transfer Protocol) para transferir correos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Host del servidor de correo (en este caso, Gmail)
    port: 587,  // Puerto del servidor de correo
    auth: {
        user: 'utpitos@gmail.com',  // Usuario de correo electrónico desde el cual se enviarán los correos
        pass: 'nzzuagemljlsojpb'  // Contraseña del usuario de correo electrónico
    }
});

// Función que envía el correo con el contenido usando la librería de nodemailer
export const sendMail = prod => {
    transporter.sendMail({
        from: "UTPitos <utpitos@gmail.com>",  // Remitente del correo
        to: "juan.ganan@utp.edu.co",  // Destinatario del correo
        subject: "Stock at its minimum",  // Asunto del correo
        text: `The following product's stock which ID is ${prod.id} is almost empty`  // Contenido del correo
    }).then(console.info)
    .catch(console.catch);
};
