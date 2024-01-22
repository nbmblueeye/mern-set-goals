const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type:String,
        required:[true, "Please provide a title"],
    },
    description: {
        type:String,
        required:[true, "Please provide a description"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);