var mongoose = require("mongoose");

var nutritionSchema= new mongoose.Schema({
    UserID:String,
  
    meal_type:String,
    food_item:String,
    quantity:Number,
    calories:Number,
    protein:Number,
    crab:Number,
    fats:Number,
    dateday:String,
    status:String,

})

var nutritionData = mongoose.model("nutritionLog",nutritionSchema);
module.exports=nutritionData;
