const UserController = require('../controller/userLocationController');
const UserValidation = require('../validation/userValidation');
const LoginController = require('../controller/loginController');
const PerfilController = require('../controller/perfilController');

module.exports = app =>{

    app.get('/', (req, res)=>{
        if(req.session.autorizado){
            return res.render('index');
        } else {
            return res.render('login');
        }
    })

    app.get('/login', (req, res) =>{
        res.render('login');
    })

    app.post('/login', (req, res) =>{
        LoginController.login(req, res);
    })

    app.get('/register', (req, res)=>{
        res.render('register')
    });

    app.post('/register',
        UserValidation.validate('all')
    ,(req, res, next)=>{
        UserController.register(req, res, next);
    });

    app.post('/userLocation', (req, res)=>{
        UserController.userLocation(req, res)
    });

    app.get('/perfil/:id', (req, res)=>{
        PerfilController.showPerfil(req, res);
    });

    app.post('/solicitaTel', (req, res) =>{
        PerfilController.solicitaTel(req, res);
    })

    app.get('/mensagem', (req, res) =>{
        if(req.session.autorizado){
            return  res.render('mensagem'); 
        }
        res.render('login');
    })
    
    app.get('/findRequest', (req, res) =>{
        if(req.session.autorizado){
            PerfilController.findRequest(req, res);
        }else{
            res.render('login');
        }
    })

    app.get('/acceptRequest/:id', (req, res)=>{
        if(req.session.autorizado){
            PerfilController.acceptRequest(req, res);
        } else {
            res.render('login');
        }
    })

    app.get('/rejectRequest/:id', (req, res)=>{
        if(req.session.autorizado){
            PerfilController.rejectRequest(req, res);
        } else {
            res.render('login');
        }
    })

    app.get('/sair', (req, res)=>{
        req.session.destroy();
        res.render('login');
    })

}