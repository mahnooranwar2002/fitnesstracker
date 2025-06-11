var mongose= require("mongoose")

var userSchema = new   mongose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,
    status:Number,
    is_admin:{
        default:0,
        type:Number,
    }
    
})

var userData=mongose.model("user",userSchema);

module.exports=userData;