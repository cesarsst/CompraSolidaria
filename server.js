const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');


const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Body-parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));


app.use(express.static('./src/public'));

app.use(expressSession({
    secret: 'hsohdoasdoansodasdlçk',
    resave: false,
    saveUninitialized: false
}))

consign()
    .include('src/routes')
    .into(app);



module.exports = app;
