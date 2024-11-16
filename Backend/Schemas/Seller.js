const db = require("../config/db");

const SellerSchema = db.Schema({
    BusinessEmail: {type: String, required: true, unique: true},
    AssociatedBuyerAccountEmail: {type: String, required: true},
    Name: {type: String, required: true},
    CNIC: {type: String, required: true},
    NTN: {type: String, required: true},
    IBAN : {type: String, required: true},
    sellerAccountStatus : {type: String, enum: ['pending', 'approved' , 'rejected'], default: 'pending'}
})

const SellerModel = db.model("Sellers" , SellerSchema);

module.exports = SellerModel;