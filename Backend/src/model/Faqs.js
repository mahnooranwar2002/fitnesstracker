var mongoose = require("mongoose")

var faqSchema = mongoose.Schema({
    Subject:String,
    question: String,
    answer:String 
  
})


var faqModel = mongoose.model("faqs",faqSchema)

module.exports = faqModel