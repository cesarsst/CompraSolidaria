const app = require('./server');
const mongoose = require('mongoose')


var port = process.env.PORT || 21307;

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

app.listen(port, ()=>{
  console.log("Servidor online!");
})




