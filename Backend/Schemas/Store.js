const { default: mongoose } = require("mongoose");
const db = require("../config/db");

const StoreSchema = db.Schema({
    LogoURL: {type: String, required: true},
    StoreOwner: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    StoreName: {type: String, required: true},
    Followers: {type: Number, default: 0},
    StoreRatings: {type: Number, default: 0},
    TotalProducts: {type: Number, default: 0},
    ProductCategories: [String]
});

const StoreModel = db.model("Store", StoreSchema);
module.exports = StoreModel;