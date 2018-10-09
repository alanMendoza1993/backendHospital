var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicosSchema = new Schema({
    nombre: { type: String, required: [true, "el nombre es necesario"] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario', required: [true, "El usuario es obligatorio"] },
    hospital: { type: Schema.Types.ObjectId, ref: 'hospital', required: [true, "el id del hospital es obligatorio"] }
}, { collection: 'medicos' });

var medicos = mongoose.model('medico', medicosSchema);
module.exports = medicos;