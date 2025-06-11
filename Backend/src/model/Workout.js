var mongose = require("mongoose")

var  workoutSchema= new mongose.Schema({
    UserID:String,
    ExerciseName:String,
    Sets:Number,
    Reps:Number,
    Weights:Number,
    Notes:String,
    Category:String,
    Tags:String,
    CreatedAt:String,
    UpdatedAt:String,
})

var workoutData = mongose.model("workout",workoutSchema);
module.exports=workoutData;