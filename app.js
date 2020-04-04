const app = require('./server');
const mongoose = require('mongoose')
const fs = require("fs");
const https = require("https");

var port = process.env.PORT || 21307;

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt")
};

// setup mongo connection
mongoose.connect('mongodb+srv://admin:admin@cluster0-jl0x6.mongodb.net/CompraSolidaria?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('Conectado ao banco de dados com sucesso!');
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


https.createServer(options, app).listen(port);




