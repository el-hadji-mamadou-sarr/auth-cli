const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json()); 

app.post('/login', (req, res)=>{
       console.log(req.body)
        res.json({message: "success"});
})

app.listen(3000, ()=>{
        console.log("server started at port 3000");
})