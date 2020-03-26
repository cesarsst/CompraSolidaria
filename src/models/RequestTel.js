const {Schema, model } = require('mongoose');

const RequestTelSchema = new Schema({

    userRequest: {
        type: String,
        required: true
    },
    userResponse:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
});

module.exports = model('RequestTel', RequestTelSchema);