var mongoose = require("mongoose")

var feedbackSchema = mongoose.Schema({
    name:String,
     email:String,
     Subject:String,
    feedback: String,
    date:String 
  
})


var feedbackModel = mongoose.model("Feedbacks",feedbackSchema)

module.exports = feedbackModel