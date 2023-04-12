const axios = require('axios');

async function paymentService(items, id){
 const url = 'https://api.mercadopago.com/checkout/preferences'

 const body = {
  items: items,

  notification_url: process.env.NOTIFICATION_URL+id,

  back_urls: {
    failure: process.env.MP_FAILURE,
    pending: process.env.MP_PENDING,
    success: process.env.MP_SUCCESS
  },
}

  try {
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "aplication/json",
        Authorization: process.env.AUTHORIZATION
      }
    })

    return payment.data.init_point

  } catch (e) {
    return {message: 'Error al generar el link de pago'}
  }
}

module.exports = {
  paymentService
}