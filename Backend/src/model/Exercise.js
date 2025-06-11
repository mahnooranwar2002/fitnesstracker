var mongoose = require("mongoose");

var exerciseSchema = mongoose.Schema({
    user_id:String,
    workout_category: String,
    exercise_name:String,
    sets:Number,    
    reps:Number,  
    Weight:Number,
    notes:String, 
     status:String,
    daydate:String
})

var exerciseModel = mongoose.model("Exercise",exerciseSchema)

module.exports = exerciseModel