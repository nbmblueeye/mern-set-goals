const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protected = asyncHandler(async(req, res, next) => {

    let token;
    let data = req.headers.authorization;

    if(data && data.startsWith('Bearer ')){
        try {

            token = data.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.userId).select('-password');
            req.user = user._id;
            next();

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized")
        }
        
    }

    if(!token){
        res.status(401);
        console.log(error);
        throw new Error("Not authorized, please login")
    }
})

module.exports = { protected }