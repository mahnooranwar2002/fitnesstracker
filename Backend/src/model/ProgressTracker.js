var mongoose = require("mongoose")

var progressSchema = mongoose.Schema({
    userId: String, 
    weight: Number,
    chest: Number,   
    waist: Number,
    hips: Number,
    arms: Number,
    legs: Number,
    runTime: Number, 
    squatMax: Number, 
    benchPressMax: Number,
    deadliftMax: Number,
    notes: String, 
    dateDay: String,
        
})

var progressModel = mongoose.model("Progress",progressSchema)

module.exports = progressModel