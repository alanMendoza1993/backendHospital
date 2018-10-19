var express = require('express');
var app = express();
var Usuario = require('../models/usuarios');
var bcrypt = require('bcryptjs');
var auth = require('../auth/auth').atutToken;

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role')
        .skip(desde)
        .limit(5)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "error al cargar",
                    error: err
                });
            }


            Usuario.count({}, (err, conteo) => {
                res.status(200).json({

                    ok: true,
                    usuarios: usuario,
                    total: conteo
                });
            });

        });

});
////////////////////////////////////////////////////
//////////ACTUALIZAR___USUARIOS////////////////////////
///////////////////////////////////////////////////
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar el usuario',
                error: err

            });
        }

        if (!usuario) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Usuario Inexistente',
                error: err

            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.password = body.password;


        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al guardar actualizacion',
                    error: err

                });
            }
            usuarioGuardado.password = '*****';
            res.status(201).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });


});



////////////////////////////////////////////////////
//////////GUARDAR___USUARIOS////////////////////////
///////////////////////////////////////////////////
app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al gardar',
                error: err,
                token: req.query.token

            });
        }

        return res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
});
////////////////////////////////////////////////////
//////////GUARDAR___USUARIOS////////////////////////
///////////////////////////////////////////////////

app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrarr',
                error: err

            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No Existe el Usuario',
                error: { massage: 'No existe el Usuario con ese ID' }

            });
        }

        return res.status(201).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;