const mercadopago = require("mercadopago");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  });
