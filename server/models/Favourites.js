const mongoose=require('mongoose')
const FavouritesSchema=new mongoose.Schema({
    username:String,
    vehicleid:String,
    cost:Number,
});
const Favourites=mongoose.model("Favourites",FavouritesSchema,"Favourites")

module.exports=Favourites;