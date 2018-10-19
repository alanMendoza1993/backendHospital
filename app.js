// requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// iniciar Variables

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//conexion
mongoose.connection.openUri('mongodb://localhost:27017/hospitalBd', (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");
});

//importar rutas
var hospitalesRoutes = require('./routes/hospitales');
var loginRoutes = require('./routes/login');
var medicosRoutes = require('./routes/medicos');
var usuariosRoutes = require('./routes/usuarios');
var uploadRoutes = require('./routes/upload');
var appRoutes = require('./routes/routes');
var busquedaRoutes = require('./routes/busqueda');
var imagenesRoutes = require('./routes/imagenes');
//rutas
app.use('/usuarios', usuariosRoutes);
app.use('/hospitales', hospitalesRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/medicos', medicosRoutes);
app.use('/imagenes', imagenesRoutes);
app.use('/', appRoutes);

// escuchar
app.listen(3000, () => {
    console.log('Express server puerto 3000 online');
});