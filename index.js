const express = require('express');
const app = express();
const bodyParser = require('body-parser');;
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


// database
mongoose 
 .connect(process.env.MONGO, { useNewUrlParser : true })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));



const auth = require('./src/routes/auth');
const sys = require('./src/seeders/sys');

app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb' }));
app.use('/assets',express.static(__dirname + '/public/uploads'));
app.use(cors());


app.use('/', auth);

sys();


const host = '0.0.0.0';
const port = process.env.PORT || 4000;


app.listen(port, host, ()=> {
    console.log("Server is running ... ");
});
