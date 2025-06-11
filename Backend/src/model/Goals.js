const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: String,
  type:String,
  targetValue:Number,
  unit:String,
  currentValue:Number,
  description:String,
  startdate: { type: Date, default: Date.now },
  endDate: { type: Date }, 
   achieved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Goal', goalSchema);