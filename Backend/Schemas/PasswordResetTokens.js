const mongoose = require('../config/db');

const passwordResetTokens = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    TokenHash: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: {expires: "10m"}
    }
});

const PasswordResetTokens = mongoose.model('passwordResetTokens', passwordResetTokens);
module.exports = PasswordResetTokens;