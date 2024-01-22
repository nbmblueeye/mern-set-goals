const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const useRegister = asyncHandler(async(req, res) => {

    const { name, email, password, passwordConfirmation } = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter information')
    }

    if(email){
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!regex.test(email)){
            res.status(400)
            throw new Error('Invalid email')
        }
    }

    if(password != passwordConfirmation){
        res.status(400)
        throw new Error('Password are not match')
    }

    const isUser = await User.findOne({email:email});
    if(isUser){
        res.status(400)
        throw new Error('Email is already registered');
    }

    let salt = await bcrypt.genSalt(10);
    let passwordHashed = await bcrypt.hash(password,salt);
 
    const user = await User.create({name:name, email:email, password:passwordHashed});

    if(!user){
        res.status(400)
        throw new Error('Invalid user data');
    }else{
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        })
    }
});

const useLogin = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email:email});

    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
    }else{
        res.status(401)
        throw new Error('Invalid user email or password');
    }

});

const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
});

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({user, message: "User deleted"})
});

const generateJWT = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
}

module.exports = {
    useRegister,
    useLogin,
    getUser,
    deleteUser
}
