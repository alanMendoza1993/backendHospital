var express = require('express');
var app = express();
var modMedico = require('../models/medicos');
var modHospital = require('../models/hospitales');
var modUsuario = require('../models/usuarios');

//////////BUSQUEDA ESPECIFICA////////////////
app.get('/coleccion/:tabla/:busqueda', (req, res) => {
    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    if (tabla === 'usuarios') {
        buscarUsuario(busqueda, regex).then(respuesta => {
            res.status(200).json({
                ok: true,

                usuario: respuesta
            });
        });
    } else if (tabla == 'medicos') {
        buscarMedicos(busqueda, regex).then(respuesta => {
            res.status(200).json({
                ok: true,

                Medico: respuesta
            });
        });
    } else if (tabla == 'hospitales') {
        buscarMedicos(busqueda, regex).then(respuesta => {
            res.status(200).json({
                ok: true,

                Hospital: respuesta
            });
        });
    } else {
        res.status(200).json({
            ok: true,
            busqueda,
            tabla,
            Mensaje: "la tabla no es correcta"
        });
    }
});


///////BUSQUEDA  TODO//////////////////////
app.get('/todo/:busqueda', (req, res, next) => {
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    Promise.all([buscarHospitales(busqueda, regex), buscarMedicos(busqueda, regex), buscarUsuario(busqueda, regex)])
        .then(respuesta => {

            res.status(200).json({
                ok: true,
                busqueda,
                hospital: respuesta[0],
                medico: respuesta[1],
                usuario: respuesta[2]
            });
        });


});

function buscarHospitales(busqueda, regex) {
    return new Promise((resolve, reject) => {
        modHospital.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .exec((err, hospital) => {
                if (err) {
                    reject('Error al cargar hospitales', err);
                } else {
                    resolve(hospital);
                }
            });
    });
}

function buscarUsuario(busqueda, regex) {
    return new Promise((resolve, reject) => {
        modUsuario.find()
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

function buscarMedicos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        modMedico.find({ nombre: regex }, (err, medico) => {
            if (err) {
                reject('Error al cargar hospitales', err);
            } else {
                resolve(medico);
            }
        });
    });
}

module.exports = app;