const mongoose = require('mongoose');
const userSchema = require("../Schemas/user.schemas");

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;