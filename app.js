const express = require("express");
require('dotenv').config()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

const dbUrl = process.env.DB_URL;
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error', (error)=>console.log(error));
db.once('open', (open)=>console.log('connected to database'));

//the authentification prosess
require('./passport')
app.post('/login', (req, res, next)=>{

        //authenticate the user using the local strategy
        passport.authenticate('local', (err, user, info)=>{
                if(err || !user){
                        return res.status(403)
                                .json({message:"invallid email or password"})
                }

                //if the authentification succeed we need to logged the user. the req.login establish
                //a session for the user.
                req.login(user, {session:false}, (err)=>{
                        if(err){
                                res.send(err);
                        }
                        const token = jwt.sign(user, process.env.JWT_SECRET);
                        return res.json({user, token});
                });

                //then we need to call the self invoking function with the req, res, next params.

        })(req, res, next)
})

app.post('/register', (req, res)=>{

})

app.get('/secureRoute', (req, res)=>{
        res.json({message: "secure route"})
})

const addUser = async()=>{
        await userModel.create({
                email:"elhadji@outlook.com",
                password: await bcrypt.hash("secret",10)
        });
}




app.listen(3000, ()=>{
        console.log("server started at port 3000");
})