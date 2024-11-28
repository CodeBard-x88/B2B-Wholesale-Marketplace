const mongoose = require("../config/db");

const userschema = mongoose.Schema({

  Name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  Email: {type: String, required: true, unique: true},
  Phone: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  JoiningDate: {type: Date, default: Date.now},
  StoreID: { type: mongoose.Types.ObjectId, ref: 'Store', default: null },
  role: {type: String, enum: ['buyer', 'seller' , 'admin'] , default: 'buyer'}
})

userschema.method('validatePassword', async function(password){
  if (password === this.password)
    return true;

  return false;
})

module.exports = mongoose.model("user", userschema);