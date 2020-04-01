const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports.userLocation = async function(req, res) {
    
    const { coordenadas } =  req.body;

    // Atualiza a posição atual do usuario conectado
    const userLogged = await User.find({_id: req.session.userLogged});
    userLogged[0].lat = coordenadas.lat;
    userLogged[0].lng = coordenadas.lng;
    userLogged[0].save();
    console.log(userLogged[0]);

    const userListAll = await User.find({});
    var userListProx = [];

    // Busca usuario proximos, até 5km
    userListAll.forEach(element => {

        var distancia = 0;

        distancia = (getDistanceFromLatLonInKm(
            coordenadas,
            {lat: element.lat, lng: element.lng}
         ));
        
        if(element._id != req.session.userLogged){
            if(distancia <= 5000){
                userListProx.push([element, distancia/1000]);
            }
        }
        

    })

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
            return res.render('register', {errors});
        }


        var {name, email, tel, password, confirmPassword, perfilType, lat, lng} = req.body;

        if(perfilType[0]){
            perfilType = 0;
        } else {
            perfilType = 1;
        }
        
        if(password !== confirmPassword){
            return res.render('register', {errors: "As senhas não coincidem!"});
        }

        const userExist = await User.find({email});
        if(userExist.length != 0){
            return res.render('register', {errors: "Email já cadastrado!"});
        }

        const user = await User.create({name,img: req.file.filename, email, tel, password, confirmPassword, lat, lng, perfilType});   
       
        return res.render('login');

    } catch(err) {
        return next(err);
    }

}

exports.atualizaPerfil = async (req, res, next) =>{
    
    if(req.session.autorizado){
        
        try{

            // Return errors validator
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.status(422).json({errors: errors.array({onlyFirstError: true})})
                return 
            }

            var {name, tel, perfilType} = req.body;
            
            // Fazer validação do telefone enviado

            if(perfilType[0]){
                perfilType = 0;
            } else {
                perfilType = 1;
            }
            

            // Verifica se foi enviado um arquivo, se não foi, mantem o atual
            var fileName = req.file;
            const findUser = await User.find({_id: req.session.userLogged});
            if(fileName == undefined){
                fileName = findUser[0].img;  
            } else {
                fileName = req.file.filename;
            }
        
            const user = await User.findById(req.session.userLogged, function(err, doc){
                doc.name = name;
                doc.img = fileName;
                doc.tel = tel;
                doc.perfilType = perfilType;
                doc.save();
            });
            
            return res.render('conta');

        } catch(err){
            return next(err);
        }
    } else{
        return res.render('login');
    }

    
}