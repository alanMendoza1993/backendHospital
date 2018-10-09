var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var hospitalesSchema = new Schema({
    nombre: { type: String, required: [true, 'Debe ingresar el nombre'], unique: true },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario', required: [true, 'Debe ingresar el nombre'] }
}, { collection: 'hospitales' });

hospitalesSchema.plugin(uniqueValidator, { message: 'Este Nombre ya esta registrado' });
var hospitales = mongoose.model('hospital', hospitalesSchema);
module.exports = hospitales;