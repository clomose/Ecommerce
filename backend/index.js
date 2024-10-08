const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connect = require('./config/db')
const router = require("./routes/index");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
console.log('Hello');
connect();
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api',router)

const PORT = 8080 || process.env.PORT
app.listen(PORT,() => {
    console.log("Listening to the port "+PORT)
})