const { default: mongoose } = require("mongoose");
const db = require("../config/db");

const RatingsReviewsSchema = db.Schema({
    ProductId: {type: String, required: true},
    Reviews:[String],
    Ratings:[Number]
})

const RatingReviewsModel = db.model("RatingsReviews", RatingsReviewsSchema);
module.exports = RatingReviewsModel;