var express = require('express');
var app = express();
var modHospitales = require('../models/hospitales');
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    modHospitales.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(200).json({
                    ok: false,
                    usuario: "madres",
                    err
                });
            }

            modHospitales.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuario: usuarios,
                    total: conteo
                });
            });
        });
});
///////GUARDAR/////////////////////
app.post('/', (req, res) => {
    var usuario = new modHospitales({
        nombre: req.body.nombre,
        img: req.body.img,
        usuario: req.body.usuario
    });

    usuario.save((err, hospitalGuardado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: "error al guardar hostipal",
                err
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalGuardado
        });
    });
});
///////////ACTUALIZAR//////////////////
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    modHospitales.findById(id, (err, hospital) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                error: "error al encontrar al usuario"
            });
        }
        if (!hospital) {
            return res.status(400).json({
                ok: true,
                error: "Hospital no encontrado"
            });
        }
        hospital.nombre = body.nombre;
        hospital.img = body.img;
        hospital.usuario = body.usuario;


        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "problemas al guardar hospital"
                });
            }
            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        });

    });


});

/////////////////ELIMINAR//////////////
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    modHospitales.findByIdAndDelete(id, (err, hospitalEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "error al buscar"
            });
        }
        if (!hospitalEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "No existe el hospital"
            });
        }

        return res.status(400).json({
            ok: true,
            hospital: hospitalEliminado
        });
    });
});
module.exports = app;