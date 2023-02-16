const User = require('../models/User')
const bcrypt = require('bcrypt')
exports.findByUsername = (username) => User.findOne({username});
exports.register = async (username, email, password, repeatPassword) => {
    if(password !== repeatPassword){
        throw new Error('Password missmatch!');
    }
    //TODO: check if user exists
    const existingUser = await this.findByUsername(username);

    if(existingUser){
        throw new Error('User exists!')
    }
    //TODO: Validate Password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, email, password: hashedPassword });
};

exports.login = (email, password) => {

};