const mongoose = require('mongoose');
const { Schema } = mongoose;

const usrSchema = new Schema({
    nombreuser: { type:String, require:true },
    correouser: { type:String, require: true },
    passuser: { type:String, require: true },
    acountuser: { type:String, require: true },
    tipouser:{ type:String, require: true }
});

module.exports = mongoose.model('user', usrSchema);
