const express = require("express");
const logger = require('../utils/logger');
//Controller
const userController = require('../controllers/user');
const validate = require("../middleware/validate");
const { addUserSchema } = require("../middleware/validations/user");
//Model


const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.post('/add', validate(addUserSchema), userController.addUser)

module.exports = router;