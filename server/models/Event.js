const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  EventId:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
    required:true,
    auto: true
  },
  
  description:{
    type: String,
    required: true
  },
  invitedUser:{
    type:[{
      type:mongoose.Schema.Types.Object,
      ref:"InvitedUser"
    }]
  },
  createdAt:{
    type:Date,
    default:new Date()
  }
});
module.exports = mongoose.model("Event", EventSchema);
