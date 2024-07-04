const mongoose=require('mongoose')
const vehiclesSchema=new mongoose.Schema({
   vehicleid:String,
   vehicleimage:String,
   name:String,
   status:String,
   feedbacks:String,
   rating:Number,
   cost:Number,
   category:String,
   fuel:String,
   seats:Number,
   trips:Number,
   place:String
});
const vehicles=mongoose.model("vehicles",vehiclesSchema,"vehicles")

module.exports=vehicles;