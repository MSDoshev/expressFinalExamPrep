const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
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