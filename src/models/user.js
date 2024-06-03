const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userId: { type: String },
		name: { type: String, required: true, minlength: 3, maxlength: 30 },
		email: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 80,
			unique: true,
		},
		password: { type: String, required: true, minlength: 3, maxlength: 1024 },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
