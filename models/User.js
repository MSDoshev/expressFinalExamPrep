const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [5, 'Username should be at least 5 characters long.'], 
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        minLength: [10, 'Email should be at least 10 characters long.'],
        required: [true, 'Email is required'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

// userSchema.virtual('repeatPassword').set(function(value){
//     if(this.password !== value){
//         throw new mongoose.MongooseError('Password missmatch!')
//     } 
// })

const User = mongoose.model('User', userSchema);
module.exports = User;