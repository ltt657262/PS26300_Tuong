const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true, },
    created_at: { type: Date, default: Date.now, },// thời gian tạo token
    status: { type: Boolean, default: true, }, // trạng thái token, được sử dụng hay không

});


module.exports = mongoose.model('PasswordReset', schema) || mongoose.models.PasswordReset;