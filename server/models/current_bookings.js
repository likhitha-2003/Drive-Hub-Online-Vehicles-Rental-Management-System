const mongoose=require('mongoose')
const current_bookingsSchema=new mongoose.Schema({
    username:String,
    vehicleid:String,
    vehicleimage:String,
    name:String,
    totalcost:Number,
    startdate:String,
    returndate:String,
});
const current_bookings=mongoose.model("current_bookings",current_bookingsSchema,"current_bookings")
module.exports=current_bookings;