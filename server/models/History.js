const mongoose=require('mongoose')
const HistorySchema=new mongoose.Schema({
    username:String,
    vehicleid:String,
    vehicleimage:String,
    name:String,
    totalcost:Number,
    startdate:String,
    returndate:String,
});
const History=mongoose.model("History",HistorySchema,"History")

module.exports=History;