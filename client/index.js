const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

const login = fs.readFileSync('./client/login.html');
const register = fs.readFileSync('./client/register.html');
const index = fs.readFileSync('./client/index.html');

app.get('/login', (req, res)=>{
        res.end(login);
})
app.get('/register', (req, res)=>{
        res.end(register);
})
app.get('/index', (req, res)=>{
        res.end(index);
})

app.listen(5000, ()=>{
        console.log('the client is listening at port 5000');
})