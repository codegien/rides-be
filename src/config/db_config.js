const mongoose = require("mongoose");

require("dotenv").config();
const DB = process.env.DB_STRING;
console.log(DB);

const connectDB = async () => {
	try {
		console.log("Connecting...");
		await mongoose.connect(DB, {});
		console.log("Connection to database successfully...");
	} catch (error) {
		console.log("Error connecting to database:", error);
	}
};

module.exports = connectDB;
