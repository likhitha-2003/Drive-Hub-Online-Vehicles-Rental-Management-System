const mongoose=require('mongoose')
const RegisterSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    phoneno:String,
    gender:String,
    address:String,
    dob:String,
    altphoneno:String,
    username:String,
    password:String,
    status:String
});
const Register=mongoose.model("Register",RegisterSchema,"Register")
module.exports=Register;