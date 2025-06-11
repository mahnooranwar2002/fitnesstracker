var mongoes=require("mongoose")
mongoes.connect("mongodb://127.0.0.1:27017/fitnessTracker").then(()=>{
    console.log("database connected")
})