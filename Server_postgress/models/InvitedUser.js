const mongoose = require("mongoose");
const InvitedUserSchema = new mongoose.Schema({
 UserId:{
    type:String,
    required:true
 },
 status:{
   type:String,
   default:"pending"
 },
 invitedAt:{
    type: Date,
    default: Date.now
 }
});
module.exports = mongoose.model("InvitedUser", InvitedUserSchema);
