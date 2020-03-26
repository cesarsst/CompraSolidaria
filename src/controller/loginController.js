const User = require('../models/User');

exports.login = async (req, res) =>{

    const {email, password} = req.body;

    const userExist = await User.find({email, password});

    if(userExist.length == 0){
        // se email e senha estiver errado
        req.session.autorizado = false;
        return res.status(422).json({errors: [{msg: 'Usuário ou senha incorreta!'}]});
    }else{
        req.session.userLogged = userExist[0]._id;
        req.session.autorizado = true;
    }

    
    return res.status(200).json({userExist});

}