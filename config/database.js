require('dotenv').config();
const mongoose = require ('mongoose');
const logger = require('../utils/logger');

//mongodb connection
mongoose.connect(process.env.MONOGO_DB)
.then(() => { logger.i("Mongo DB connected!") })
 .catch((err) => console.log(err));

 module.exports = mongoose;