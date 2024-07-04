const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    phoneno:String,
    gender:String,
    Address:String,
    DOB:String,
    Altphoneno:String,
    username:String,
    password:String
});
const customers=mongoose.model("customers",customerSchema)
module.exports=customers;