const express = require('express')
const path = require('path')
const app = express();
const morgan = require('morgan');

require('dotenv').config();
const port = process.env.PORT


app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//app.use(multer().single('input fild name which holds the image file'))

app.use(express.static(path.join(__dirname, 'public')));

const allowCrossDomain = (req, res, next) =>{
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Methods',"GET, POST,PUT,DELETE")
    res.header('Access-Control-Allow-Headers' ,'Content-Type, Authorization');
    if('OPTIONS' == req.method){
        res.sendStatus(200);
    }else{
        next();
    }
};

app.use(allowCrossDomain);

app.use('/api', require('./routes'))

app.listen(port,()=>{console.log(`listening on port ${port}`)});

