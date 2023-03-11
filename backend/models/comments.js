const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
