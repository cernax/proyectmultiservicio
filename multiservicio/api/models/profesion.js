const mongoose = require('mongoose');
const { Schema } = mongoose;

const prfSchema = new Schema({
    id: { type:String, require: true },
    profesion:{ type:String, require: true }
});

module.exports = mongoose.model('profesion', prfSchema);
