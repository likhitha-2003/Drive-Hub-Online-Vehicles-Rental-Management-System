const mongoose=require('mongoose')
const FeedbacksSchema=new mongoose.Schema({
    username:String,
    vehicleid:String,
    feedback:String,
    Rating:Number
});
const Feedbacks=mongoose.model("Feedbacks",FeedbacksSchema,"Feedbacks")

module.exports=Feedbacks;