const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { mongoose } = require('./database');

const app = express();

//settings

//npm run dev = para iniciar las apis
//mongod para iniciar la base de datos


app.set('port', process.env.PORT || 3001)

//middlewares
app.use(cors());
app.use(morgan('dev', null));
app.use(express.json());
//routes;
    app.use('/api/portafolio', require('./routes/portafolio.routes'));
    app.use('/api/profesion', require('./routes/profesion.routes'));
    app.use('/api/profile', require('./routes/profile.routes'))
    app.use('/api/user', require('./routes/user.routes'));
// Error Handling
app.use((req, res) => {
    res.status(404).send("Not Found");
});
//starting server
app.listen(app.get('port'), () => {
    console.log('server on port 3001')
});
