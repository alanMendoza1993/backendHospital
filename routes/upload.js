var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var modUsuario = require('../models/usuarios');
var modHospitales = require('../models/hospitales');
var modMedicos = require('../models/medicos');
var fs = require('fs');
///////Lista
// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res) => {
    var tipo = req.params.tipo;
    var id = req.params.id;
    var tipos = ['medicos', 'hospitales', 'usuarios'];
    if (tipos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: true,
            error: 'el tipo no es valido'
        });
    }
    if (!req.files) {
        return res.status(200).json({
            ok: false,
            error: 'no hay archivos'
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.imagen;

    var nombrPunto = sampleFile.name.split('.');

    var extencion = nombrPunto[nombrPunto.length - 1];


    var extencionValida = ['jpg', 'png', 'gif', 'jpeg'];

    if (extencionValida.indexOf(extencion) < 0) {

        return res.status(200).json({
            ok: false,
            error: { message: 'extencion no valida, las extenciones validas son ' + extencionValida.join(', ') }
        });

    }
    //nombre archivo
    var nombreArchivo = `${id}${tipo}${new Date().getMilliseconds()}.${extencion}`;
    //url phat donde guardare archivo
    var phat = `./uploads/${tipo}/${nombreArchivo}`;


    ///mover archivo
    sampleFile.mv(phat, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        actualizarNombre(id, tipo, nombreArchivo, res);

    });


});


function actualizarNombre(id, tipo, nombreArchivo, res) {



    if (tipo === "usuarios") {
        modUsuario.findById(id, (err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    error: "al buscar",
                    err
                });
            }
            let phat = `./uploads/${tipo}/${usuario.img}`;

            if (fs.existsSync(phat)) {
                fs.unlink(phat);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,

                        err
                    });
                }
                return res.status(200).json({
                    ok: true,

                    usuario: usuarioActualizado
                });
            });
        });
    } else if (tipo === 'hospitales') {
        modHospitales.findById(id, (err, hospital) => {
            let phat = `./uploads/${tipo}/${hospital.img}`;
            if (fs.existsSync(phat)) {
                fs.unlink(phat);
            }
            hospital.img = nombreArchivo;

            hospital.save((err, hospitalGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: true,
                        err
                    });
                }
                res.status(200).json({
                    ok: true,
                    hospital: hospitalGuardado
                });
            });

        });
    } else if (tipo === 'medicos') {

        modMedicos.findById(id, (err, medico) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }



            let phat = `./uploads/${tipo}/${medico.img}`;
            if (fs.existsSync(phat)) {
                fs.unlinkSync(phat);
            }

            medico.img = nombreArchivo;


            medico.save((err, medicoGuardado) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    medico: medicoGuardado
                });
            });
        });

    }
}

module.exports = app;