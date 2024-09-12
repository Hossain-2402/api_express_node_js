const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	userId : mongoose.Schema.Types.ObjectId,
	userEmail : { type: String, required : true },
	userPassword : { type: String, required : true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;