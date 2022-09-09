const express = require("express");
const validate = require("../middleware/validate");
const { addUserSchema } = require("../middleware/validations/user");

//passport JWT
const passportRef = require('../utils/passport');

//Controller
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/add', validate(addUserSchema), userController.addUser);

module.exports = router;