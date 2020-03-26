const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports.userLocation = async function(req, res) {
    
    const { coordenadas } =  req.body;

    const userListAll = await User.find({});
    var userListProx = [];

    userListAll.forEach(element => {

        var distancia = 0;

        distancia = (getDistanceFromLatLonInKm(
            coordenadas,
            {lat: element.lat, lng: element.lng}
         ));
        
         console.log(distancia)
        if(element._id != req.session.userLogged){
            if(distancia <= 5000){
                userListProx.push([element, distancia]);
            }
        }
        

    })

    console.log(userListProx);
    res.status(200).json(userListProx);

}

function getDistanceFromLatLonInKm(position1, position2) {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(position2.lat - position1.lat),
        dLng = deg2rad(position2.lng - position1.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(position1.lat))
            * Math.cos(deg2rad(position1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());
}


module.exports.register = async function(req, res, next){

    try{

         // Return errors validator
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array({onlyFirstError: true})})
            return 
        }

        const {name, email, tel, password, passwordConfirm, latitude, longitude, perfilType} = req.body;
        
        if(password != passwordConfirm){
           return res.status(422).json({errors: [{msg:'As senhas não coincidem!'}]});
        }

        const userExist = await User.find({email});
        if(userExist.length != 0){
            return res.status(422).json({errors: [{msg:'Já existe um cadastro com esse email!'}]});
        }

        const user = await User.create({name, email, tel, password, passwordConfirm, lat:latitude, lng:longitude, perfilType});   
       
        return res.status(200).json({user});

    } catch(err) {
        return next(err);
    }

}