const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({

    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters long.'],
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /https?:\/\//,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters long.'],
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values:['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method',
        },
        required: true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;