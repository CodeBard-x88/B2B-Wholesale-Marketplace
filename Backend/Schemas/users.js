const mongoose = require("./db");

const userschema = mongoose.Schema({

  Name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  Email: {type: String, required: true, unique: true},
  Phone: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isSeller: {type: Boolean, default: false},
  JoiningDate: {type: Date, default: Date.now},
  StoreID: { type: mongoose.Types.ObjectId, ref: 'Store', default: null },
  role: {type: String, enum: ['user' , 'admin'] , default: 'user'}
})

userschema.method('validatePassword', async function(password){
  if (password === this.password)
    return true;

  return false;
})

module.exports = mongoose.model("user", userschema);