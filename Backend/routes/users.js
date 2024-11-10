const mongoose = require("./db");

const userschema = mongoose.Schema({

  Name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  Email: {type: String, required: true, unique: true},
  Phone: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isSeller: {type: Boolean, default: false},
  JoiningDate: {type: Date, default: Date.now},
  StoreID: { type: mongoose.Types.ObjectId, ref: 'Store', default: null }

})

module.exports = mongoose.model("user", userschema);