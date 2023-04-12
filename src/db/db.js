const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;
mongoose.connect(URI, () => {
    console.log('conectado a la base de datos');
})