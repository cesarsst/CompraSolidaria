const {Schema, model } = require('mongoose');

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    tel:{
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    lat:{
        type: Number,
        required: true
    },

    lng: {
        type: Number,
        required: true
    },

    perfilType:{
        type:Number,
        required: true
    },

    stars: {
        type: Number,
        required: false,
        default: 0
    }



}, {
    timestamps: true,
});

module.exports = model('User', UserSchema);