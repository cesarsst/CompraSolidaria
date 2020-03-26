const { body, param } = require('express-validator');

exports.validate = (method) => {

    switch(method){

        case 'all':{
            return [
                body('name', 'Nome inválido!').exists().not().isEmpty(),
                body('email', 'Email inválido!').exists().isEmail().not().isEmpty(),
                body('latitude', 'Ative sua localização para se registrar!').exists().not().isEmpty(),
                body('longitude', 'Ative sua localização para se registrar!').exists().not().isEmpty(),                                
                body('password', 'Senha inválida. Sua senha precisa ter mais de 6 digitos!').exists().isLength({min: 6}).isAlphanumeric().not().isEmpty(),
            ]
        }


    }
    


    
    

   

    

}