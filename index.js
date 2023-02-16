const express = require("express");
const hbs = require('express-handlebars');
const routes = require("./routes");

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(5000, () => console.log("Server is running on port 5000..."));
