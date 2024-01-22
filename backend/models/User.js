const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"]
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password are not match"],
        min: [6, 'At least 6 characters required'],
        max: 12
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User',userSchema);