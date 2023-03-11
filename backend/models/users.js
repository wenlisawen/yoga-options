const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id :mongoose.Schema.Types.ObjectId,
  username : String,
  email:String,
  password:String
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'user'
});

module.exports = mongoose.model('User', userSchema);
