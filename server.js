const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');


const app = express();

const apiGoogleKey = "AIzaSyAqURsSFpC-7Igj4cxH0-rzrf7sqDSOV5Y";

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Body-parser
app.use(bodyParser.urlencoded({extended: true}));

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
