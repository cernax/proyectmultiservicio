const mongoose = require('mongoose');
const { Schema } = mongoose;

const prflSchema = new Schema({
    acountuser: { type:String, require: true },
    descrip:{ type:String, require: true },
    idtrabajos:{ type:String, require: true },
    profesion:{ type:String, require: true },
    image:{
        public_id:String,
        url:String
    }
});

module.exports = mongoose.model('profile', prflSchema);
