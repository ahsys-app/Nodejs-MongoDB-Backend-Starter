require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const passportRef = require('./utils/passport');
const ejs = require('ejs');

//logger
const logger = require('./utils/logger');

//Mongo DB config
require('./config/database');

//JWT Strategy
app.use(passportRef.initialize());

//get routes
const routes = require('./routes/index');

// default template engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use('/', routes);

app.get('/', (req, res) => {
    res.render('index');
});

// app.listen(process.env.PORT, () => {
//     logger.i(`Server started on port ${process.env.PORT}`)
// })

module.exports = app




