const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userOTPschema = new schema({
    userId: mongoose.Schema.ObjectId,
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('userotp', userOTPschema);
