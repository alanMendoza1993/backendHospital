var express = require('express');
var app = express();
var Usuario = require('../models/usuarios');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
/////post////post///

app.post('/', (req, res) => {
    var body = req.body;
    if (!body.password) {
        return res.status(400).json({
            ok: false,
            error: "No ingresaste la contrasena"
        });
    }
    if (!body.email) {
        return res.status(400).json({
            ok: false,
            error: "No ingresaste la contrasena"
        });
    }
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar"
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: "No existe cuenta con este correo"
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            res.status(400).json({
                ok: false,
                error: "Contraseña incorrecta"
            });
        }

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });

    });
});

module.exports = app;