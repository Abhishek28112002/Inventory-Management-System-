const mongoose = require("mongoose");
const ModelSchema = new mongoose.Schema({
  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    unique:true,
    required:true,
    auto: true
  },
  category:{
    type: String,
    required: true
  },
  item:{
    type:[{
      type:mongoose.Schema.Types.Object,
      ref:"product"
    }]
  }
});
module.exports = mongoose.model("Category", ModelSchema);
