var express = require('express');
var app = express();
const phat = require('path');
const fs = require('fs');
app.get('/:tipo/:img', (req, res, next) => {
    var tipo = req.params.tipo;
    var img = req.params.img;

    var phatImagen = phat.resolve(__dirname, `../uploads/${tipo}/${img}`);

    if (fs.existsSync(phatImagen)) {
        res.sendFile(phatImagen);
    } else {
        var phatNoImagen = phat.resolve(__dirname, `../assets/no-img.jpg`);
        res.sendFile(phatNoImagen);
    }
    /* res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada exitosamente'
    }); */
});

module.exports = app;