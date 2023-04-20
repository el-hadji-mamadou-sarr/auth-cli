const express = require("express");
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

const dbUrl = process.env.DB_URL
mongoose.set('strictQuery', false)
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error', (error)=>console.log(error));
db.once('open', (open)=>console.log('connected to database'));

app.post('/login', (req, res)=>{
        console.log(req.body)
        res.json({message: req.body});
})

app.listen(3000, ()=>{
        console.log("server started at port 3000");
})