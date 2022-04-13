const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017';
const dbName = 'multiservicio';

mongoose.connect(uri + '/' + dbName)
    .then(db => {
        console.log('db is connected to ' + dbName);
    })
    .catch(err => console.error(err));

module.exports = mongoose;
