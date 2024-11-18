const { default: mongoose } = require("mongoose");
const db = require("../config/db");

const ProductSchema = db.Schema({
    ThumbnailURL: {type: String, required: true},
    ImagesURL: [String],
    Video: {type: String},
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    KeyFeatures: {type: String},
    Store: {type:mongoose.Schema.Types.ObjectId, ref: "Store", required: true},
    Seller: {type:mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    Price: {type: mongoose.Schema.Types.Decimal128, required: true},
    MinimumOrder: {type: Number, required: true},
    variations: [String],
    category: {type:String, required: true},
    Dimensions: [{label: String, value: String}],
    Keywords: [String],
    RatingsReviews: {type: mongoose.Schema.Types.ObjectId, ref: "RatingsReviews"},
    AverageRating: {type: mongoose.Schema.Types.Decimal128, default: 0},
    TotalReviews: {type: Number, default: 0},
    TotalSold: {type: Number, default: 0},
    LegalDisclaimers: [{heading: String, comments: String}],
    Warranty: {type: String , default: "No Warranty"},
    SKU: {type: String},
    Tags: [String],
    FAQs: [{Question: String, Answer: String}],
    WishlistCount: {type: Number, default: 0}
});

ProductSchema.pre('save', function (next) {
    if (this.Tags.length > 5) {
        return next(new Error('Cannot have more than 5 Tags!'));
    } else if (this.Keywords.length > 5) {
        return next(new Error('Cannot have more than 5 Keywords!'));
    } else if (this.FAQs.length > 20) {
        return next(new Error('Cannot have more than 20 FAQs!'));
    } else if (this.ImagesURL.length > 6) {
        return next(new Error('Cannot have more than 6 product Images'));
    } else {
        next();
    }
});


const productModel = db.model("Product" , ProductSchema);
module.exports = productModel;