const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db_config");
require("dotenv").config();

const products = require("./src/data/products");
const auth = require("./src/routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cors());

console.log(process.env.PORT);

app.get("/", (req, res) => {
	res.send("Welcome");
});
app.use("/api/v1/auth", auth);
// app.post("/login", loginValidation, login);
app.get("/products", (req, res) => {
	res.send(products);
});

connectDB();
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}...`);
});
