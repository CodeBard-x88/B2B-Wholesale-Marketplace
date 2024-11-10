// db.js
const mongoose = require("mongoose");
require('dotenv').config();

const dbURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vzqld.mongodb.net/B2BWholesaleMarketplace`;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = mongoose;
