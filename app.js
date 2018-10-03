// requires
var express = require('express');
var mongoose = require('mongoose');
// iniciar Variables

var app = express();
//conexion
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', (err, res) => {
    if (err) throw err;
    console.log("Base de datos Online");
});

//Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada exitosamente'
    });
});

// escuchar
app.listen(3000, () => {
    console.log('Express server puerto 3000 online');
});