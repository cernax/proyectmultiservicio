const mongoose = require('mongoose');
const { Schema } = mongoose;

const portafolioSchema = new Schema({
    acountuser: { type:String, require: true },
    descrip:{ type:String, require: true },
    nomportafolio:{ type:String, require: true },
    image:{
        public_id:String,
        url:String
    }
});

module.exports = mongoose.model('portafolio', portafolioSchema);
