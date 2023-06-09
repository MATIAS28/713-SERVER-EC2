const mongoose = require('mongoose');

const User =  mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es necesario'], 
        minLength: [3, 'El nombre debe contener 3 o mas caracteres'],
        maxLength: [36, 'El nombre debe contener menos de 36 caracteres']
    },
        
    surname: {
        type: String, 
        required: [true, 'El apellido es necesario'],
        minLength: [3, 'El apellido debe contener 3 o mas caracteres'],
        maxLength: [36, 'El apellido debe contener menos de 36 caracteres']
    },

    email: {
        type: String, 
        required: [true, 'El corre es obligatorio'],
        minLength: [5, 'El correo debe contener mas de 5 caracteres'],
        match: [/.+\@.+\..+/, 'Correo  no valido']
    },

    password: {
        type: String,
        required: [true, 'Escribe una contraseña'],
        minLength: [8, 'La contraseña debe contener 8 o mas caracteres']
    },

    oreders: {type: Array},

    addresses: [
        {
            dni: {
                type: String,
                required: true
            },

            phone_number: {
                type: Number
            },

            surname: {
                type: String,
                required: true
            },
    
            name: {
                type: String,
                required: true
            },
    
            address:{
                type: String,
                required: true
            },
    
            neighborhood:{
                type: String,
                required: true 
            },
    
            province:{
                type: String,
                required: true
            },
    
            locality:{
                type: String,
                required: true
            },
    
            post_code:{
                type: String,
                required: true
            }
        }
    ],

    fdn: {type: Date}
    
});


module.exports = mongoose.model('User', User);