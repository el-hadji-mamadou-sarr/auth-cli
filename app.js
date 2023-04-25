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
app.post('/login', async(req, res, next)=>{

        //authenticate the user using the local strategy
        passport.authenticate('local', async(err, user, info)=>{
                
                //if the last middleware generate an error or the email or password is invalid
                if(err || !user){
                        return res.status(403)
                                .json({message:"invallid email or password"})
                }

                //if the authentification succeed we need to logged the user. the req.login establish
                //a session for the user. So here we use a jwt token so the the session is false
                req.login(user, {session:false}, (err)=>{

                        //if the login didnt work we send an error
                        if(err){
                                res.send(err);
                        }

                        //if the login pass we generate a token to the client
                        const token = jwt.sign({_id:user.id, email:user.email}, process.env.JWT_SECRET,{expiresIn:'1h'});

                        //the token is stored in the response header cookie.
                        //So every time the client want to do a request he can use the cookie
                        res.cookie('jwtToken', token, {
                                httpOnly: true,
                                secure: false, //we using http in our app (not recommanded)
                                maxAge: 60*60*1000 //the expiration of the cookie (1h)
                        })
                        .status(200)
                        .json({message: "login successfylly"})
                        
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