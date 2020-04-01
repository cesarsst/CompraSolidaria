const User = require('../models/User');
const RequestTel = require('../models/RequestTel');

exports.showPerfil = async (req, res) =>{

    
        const { id } = req.params;

        const userExist = await User.find({_id: id});
        const user = {name: userExist[0].name, stars:  userExist[0].stars, perfilType:  userExist[0].perfilType, id: userExist[0]._id};

        return res.render('perfil', {user});
 
}

exports.getImgPerfil = async(req, res)=>{
    const { id } = req.params;

    const userExist = await User.find({_id: id});
    const user = {name: userExist[0].name, stars:  userExist[0].stars, perfilType:  userExist[0].perfilType, id: userExist[0]._id, img: userExist[0].img};

    return res.status(200).json({user});
}

exports.solicitaTel = async (req, res)=>{

    const {id} = req.body;
    const userLogged = req.session.userLogged;

    var requestExist = await RequestTel.find({userRequest: userLogged, userResponse: id})
    if(requestExist.length > 0){
        return res.status(400).json({msg: "Você já enviou um solicitação para esssa pessoa!"});
    }

    requestExist = await RequestTel.find({userRequest: id, userResponse: userLogged})
    if(requestExist.length > 0){
        return res.status(400).json({msg: "Você já possui uma solicitação com esse usuário!"});
    }

    const requestCreate = await RequestTel.create({
        userRequest: userLogged,
        userResponse: id
    });


    // Aqui deve ser enviado um email para userResponse!

    return res.status(200).json({msg: requestCreate});


}


exports.findRequest = async (req, res) =>{

    const userLogged = req.session.userLogged;
    
    // Feitas pelo usuario conectado
    var userLoggedRequest = []; // Lista de solicitações FEITAS pelo usuario conectado ainda não aceita
    var userLoggedRequestAccept = []; // Lista de solicitações FEITAS pelo usuario conectado ACEITAS 
    
    // Feitas por outros usuarios
    var userLoggedResponse = []; // Lista de solicitações feitas PARA o usuario conectado
    var userLoggedResponseAccept = []; // Lista de solicitações ACEITAS feitas PARA o usuario conectado

    const requestList = await RequestTel.find({});
    var id = 0;

    for(let i = 0;  i < requestList.length; i++){
        
        // Se foi o usuario conectado que fez 
        if(requestList[i].userRequest == userLogged){
            // Encontra o outro usuario
            
            
            id = requestList[i].userResponse;
            var userResponse = await User.find({_id:id});
            console.log(userResponse);

            // Se o outro usuario aceito -> salva o nome e o telefone
            if(requestList[i].status == true){
                userLoggedRequestAccept.push([userResponse[0].name, userResponse[0].tel])
            } else {
                // Se não entra pra fila de pendentes
                userLoggedRequest.push([userResponse[0].name]);
            }
        }

        // Se o usuario conectado foi alvo de uma solicitação
        if(requestList[i].userResponse == userLogged){
            // Busca quem fez a solicitação
            id = requestList[i].userRequest;
            var userRequest = await User.find({_id:id});
            // Se o usuario conectado já aceitou a solicitação -> mostra o nome e o telefone de quem solicitou
            if(requestList[i].status == true){
                userLoggedResponseAccept.push([userRequest[0].name, userRequest[0].tel]);
            } else {
                // Se não aceitou ainda -> mostra só o nome
                userLoggedResponse.push([userRequest[0].name, requestList[i]._id]);
            }

        }
    }



    return res.status(200).json({userLoggedRequest,userLoggedRequestAccept, userLoggedResponse, userLoggedResponseAccept});


}


exports.acceptRequest = async (req, res) =>{

    const { id } = req.params;
    const request = await RequestTel.find({_id: id});
    request[0].status = true;
    request[0].save();

    res.render('mensagem');

}

exports.rejectRequest = async (req, res) =>{

    const { id } = req.params;
    const request = await RequestTel.find({_id: id});
    request[0].delete();

    res.render('mensagem');

}


exports.requestPerfilData = async(req, res) => {

    const user = await User.find({_id: req.session.userLogged});
    
    return res.status(200).json({user});

}