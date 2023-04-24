const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
        email:String,
        password:String
});

const userModel = mongoose.model('users', userSchema);
userModel.createCollection().then((collection)=>{
        console.log("ready to use the user collection");
})

module.exports = userModel;