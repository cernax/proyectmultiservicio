const express = require('express');
const morgan = require('morgan');

const { mongoose } = require('./database');

const app = express();

//settings

//npm run dev = para iniciar las apis
//mongod para iniciar la base de datos


app.set('port', process.env.PORT || 3001)

//middlewares
app.use(morgan('dev', null));
app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
//routes
app.use('/api/user', require('./routes/user.routes'));
//static files

//starting server
app.listen(app.get('port'), () => {
    console.log('server on port 3001')
});
