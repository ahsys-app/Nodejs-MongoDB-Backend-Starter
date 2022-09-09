require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//logger
const logger = require('./utils/logger');

//get routes
const routes = require('./routes/index');

//Mongo DB config
require('./config/database');

//middleware and static files
app.use(express.static('public'))

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use('/', routes);

app.listen(process.env.PORT, () => {
    logger.i(`Server started on port ${process.env.PORT}`)
})




