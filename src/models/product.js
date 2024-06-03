const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		brand: { type: String, required: true },
		desc: { type: String, required: true, maxLength: 500 },
		price: { type: Number, required: true },
		image: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
