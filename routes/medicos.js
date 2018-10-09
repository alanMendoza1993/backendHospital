var modMedicos = require('../models/medicos');
var express = require('express');
var app = express();

///////lista de medicos///////
app.get('/', (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    modMedicos.find({})

    .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital', 'nombre')
        .exec((err, listaMedicos) => {
            if (err) {
                return res.status(200).json({
                    ok: false,
                    error: "error al buscar medicos",
                    err
                });
            }

            modMedicos.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    medicos: listaMedicos,
                    Total: conteo
                });
            });
        });
});
/////Guardar//////Guardar//////Guardar//////
app.post('/', (req, res) => {

    var medico = new modMedicos({
        nombre: req.body.nombre,
        img: req.body.img,
        usuario: req.body.usuario,
        hospital: req.body.hospital
    });

    medico.save((err, medicoGuardado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: "error al guardar",
                err
            });
        }
        res.status(200).json({
            ok: true,
            medico: medicoGuardado
        });
    });
});
////Actualizar//////Actualizar//////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    modMedicos.findById(id, (err, encontrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "error al buscar medico"
            });
        }
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                error: "No existe medico"
            });
        }
        encontrado.nombre = req.body.nombre;
        encontrado.usuario = req.body.usuario;
        encontrado.img = req.body.img;
        encontrado.hospital = req.body.hospital;

        encontrado.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: "error al guardar",
                    err
                });
            }
            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });
        });
    });
});
////////delete//////delete//////

app.delete('/:id', (req, res) => {
    var id = req.params.id;
    modMedicos.findByIdAndDelete(id, (err, eliminado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: "problemas al buscar medicos"
            });
        }
        if (!eliminado) {
            res.status(400).json({
                ok: false,
                error: "No existe medico"
            });
        }

        res.status(200).json({
            ok: true,
            eliminado
        });


    });
});
module.exports = app;