const express = require("express");
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const routes = require("./routes");

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs')

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

mongoose.set('strictQuery', false);
//Change DB name
mongoose.connect('mongodb://localhost:27017/crypto')

app.listen(3000, () => console.log("Server is running on port 3000..."));
