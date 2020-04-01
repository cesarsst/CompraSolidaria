const {Schema, model } = require('mongoose');

const StarsSchema = new Schema({

    userRequest: {
        type: String,
        required: true
    },
    userResponse:{
        type: String,
        required: true
    },
   
}, {
    timestamps: true,
});

module.exports = model('Star', StarsSchema);