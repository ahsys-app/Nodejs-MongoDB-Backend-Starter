const httpStatus = require("http-status");
const userModel = require('../models/user');
const logger = require('../utils/logger');

const getAllUsers = async(req, res) => {
    try{
        const users = await userModel.find({ role: 'user' }).sort({ createdAt: -1 });
        return res.status(httpStatus.OK).json({ message: "user fetch successful!", data: users })
    }catch(e){
        logger.e(e);
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Error! fetch users from DB."});
    }
}

const getUserById = async ( req, res ) => {
    try{
        logger.d(`userId param : ${req.params.userId}`)
        const myUser = await userModel.findOne({_id : req.params.userId})
         return res.status(httpStatus.OK).json({data: myUser});
    }catch(e){
        return res.status(httpStatus.BAD_REQUEST).json({ message: "User fetch error!" })
    }   
}

const addUser = async ( req, res ) => {
    try{
        logger.d( req.body )
        const user = new userModel();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
    
        return res.status(httpStatus.OK).json({ message: "User aded successfully.", data: user });
    }catch(e){
        logger.e(e)
        return res.status(httpStatus.BAD_REQUEST).json({ message: "add user failed!"});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
}