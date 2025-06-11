var mongoose = require("mongoose")

var BlogSchema = mongoose.Schema({
    user_id:String,
    Tittle: String,
    summary:String,
    Discription:String,
    date:String,
    status:Number,
    AuthorName:String,
    FeaturedImage:String,
     

})
var blogModel = mongoose.model("blogs",BlogSchema)
module.exports = blogModel