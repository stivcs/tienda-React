import Stripe from "stripe";  // Se importa la librería de pagos Stripe para conectarse a su API
const striper = Stripe('sk_test_51MXhMwE3qnA4gieV1zddEIRQEaSU2Ro4yVhovCZZGzuLKMvnkc1pmksgMB0B2hcPnogMWw4zzYAoiUK0trTZ7rCY00jHqdr6ZV');  // Clave de acceso de Stripe para recibir el pago

// Función que permite conectarse a la API de Stripe y realizar los pagos
export const pay = async (req, res) => {
    let { id, amount, description } = req.body;  // Se extraen los datos del cuerpo de la solicitud (id, amount, description)
    striper.paymentIntents.create({  // Se crea una solicitud de pago a través de la API de Stripe
        amount: amount * 100,  // El monto del pago se multiplica por 100 para convertirlo a la unidad mínima de la moneda (centavos)
        description: description,  // Descripción del pago
        currency: 'cop',  // Moneda del pago (en este caso, COP para pesos colombianos)
        payment_method: id,  // Método de pago utilizado (id del método de pago)
        confirm: true  // Confirmar el pago automáticamente
    }).then((pay) => {  // Si el pago se realiza correctamente
        res.json({
            message: 'payment successful',  // Mensaje de éxito
            success: true  // Indicador de éxito
        })
    }).catch((error) => {  // Si ocurre un error durante el pago
        console.log('error', error);
        res.json({
            message: 'payment failed',  // Mensaje de error
            success: false  // Indicador de fallo
        })
    })
}
