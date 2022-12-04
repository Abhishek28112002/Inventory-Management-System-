const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
 title:{
    type:String,
 },
 date:{
    type: Date,
    default: Date.now
    
 }
});
module.exports = mongoose.model("product", ProductSchema);
