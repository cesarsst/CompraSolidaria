const UserController = require('../controller/userLocationController');
const UserValidation = require('../validation/userValidation');
const LoginController = require('../controller/loginController');
const PerfilController = require('../controller/perfilController');

const User = require('../models/User');

const multer = require('multer');
const multConfig = require('../config/multer');

module.exports = app =>{

    app.get('/', (req, res)=>{
        if(req.session.autorizado){
            return res.render('index');
        } else {
            return res.render('login');
        }
    })

    app.get('//login', (req, res) =>{
        res.render('login');
    })

    app.post('//login', (req, res) =>{
        LoginController.login(req, res);
    })

    app.get('//register', (req, res)=>{
        res.render('register', {errors: null});
    });

    app.post('//register',
        multer(multConfig).single('file'),
        UserValidation.validate('all'),
    (req, res, next)=>{
        UserController.register(req, res, next);
    });

    app.post('//userLocation', (req, res)=>{
        if(!req.session.autorizado){
            return res.render('login');
        } else {
            UserController.userLocation(req, res);
        }
    });

    app.get('//perfil/:id', (req, res)=>{
        if(!req.session.autorizado){
            return res.render('login');
        } else {
            PerfilController.showPerfil(req, res);
        }
    });

    app.get('//getImgPerfil/:id', (req, res)=>{
        if(!req.session.autorizado){
            return res.render('login');
        } else {
            PerfilController.getImgPerfil(req, res);
        }
    });

    app.get('//atualizaPerfil', (req, res)=>{
        if(req.session.autorizado){
            return res.render('conta');
        }
        return res.render('login');
    });

    app.post('//atualizaPerfil',
        multer(multConfig).single('file'),
        UserValidation.validate('atualiza'),
        (req, res, next)=>{
            UserController.atualizaPerfil(req, res, next);
        }
    );

    app.get('//requestPerfilData', (req, res)=>{
        if(!req.session.autorizado){
            return res.render('login');
        } else {
            PerfilController.requestPerfilData(req, res);
        }
    })

    app.post('//solicitaTel', (req, res) =>{
        if(!req.session.autorizado){
            return res.render('login');
        } else {
            PerfilController.solicitaTel(req, res);
        }
    })

    app.get('//mensagem', (req, res) =>{
        if(req.session.autorizado){
            return  res.render('mensagem', {msg: null}); 
        }
        res.render('login');
    })
    
    app.get('//findRequest', (req, res) =>{
        if(req.session.autorizado){
            PerfilController.findRequest(req, res);
        }else{
            res.render('login');
        }
    })

    app.get('//acceptRequest/:id', (req, res)=>{
        if(req.session.autorizado){
            PerfilController.acceptRequest(req, res);
        } else {
            res.render('login');
        }
    })

    app.get('//rejectRequest/:id', (req, res)=>{
        if(req.session.autorizado){
            PerfilController.rejectRequest(req, res);
        } else {
            res.render('login');
        }
    })


    app.get('//addStar/:id', (req, res) =>{
        if(req.session.autorizado){
            PerfilController.addStar(req, res);
        } else {
            return res.render('login');
        }

    });
   

    app.get('//sair', (req, res)=>{
        req.session.destroy();
        res.render('login');
    })

}