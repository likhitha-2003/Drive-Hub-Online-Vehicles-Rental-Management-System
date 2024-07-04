const express = require('express');
const ejs = require('ejs');
var app = express();
const bodyparser=require('body-parser')
const connectDB=require('./server/config/db.js')
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const PORT=process.env.PORT || 8000;


connectDB();


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use('/', require('./server/routes/route.js'));


app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
    console.log(`userside:http://localhost:${PORT}/`);
    console.log(`Adminside:http://localhost:${PORT}/adminlogin`);

});