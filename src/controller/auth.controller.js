const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { loginValidation } = require("../middleware/authvalidation.middleware");

//REGISTER CONTROLLER
const register = asyncHandler(async (req, res) => {
	//Destructuring the inputs from req.body
	const { name, email, password } = req.body;

	//Verifying the email address inputed is not used already
	const verifyEmail = await userModel.findOne({ email: email });
	try {
		if (verifyEmail) {
			return res.status(403).json({
				message: "Email already exist",
			});
		} else {
			//generate userID
			const userID = uuidv4();
			//use bcrypt to hash the password
			bcrypt.hash(req.body.password, 10).then((hash) => {
				//Let go ahead and register the user
				const user = new userModel({
					userId: userID,
					name: name,
					email: email,
					password: hash,
				});

				// let now save the user. We have used the user schema to create a new user
				user
					.save()
					.then((response) => {
						return res.status(201).json({
							message: "User created successfully!",
							result: response,
							success: true,
						});
					})
					.catch((error) => {
						res.status(500).json({
							error: error,
						});
					});
			});
		}
	} catch (error) {
		return res.status(412).send({
			success: false,
			message: error.message,
		});
	}
});

//LOGIN() CONTROLLER
const login = asyncHandler(async (req, res) => {
	//Destructuring the inputs from req.body
	const { email, password } = req.body;

	let getUser;

	userModel
		.findOne({
			email: email,
		})
		.then((user) => {
			//if user does not exist responding Authentication Failed

			if (!user) {
				return res.status(401).json({
					message: "Authentication Failed",
				});
			}

			getUser = user;
			/*  Then compare  the password from the req.body and the hashed password associated with the found user*/

			return bcrypt.compare(password, user.password);
		})
		.then((response) => {
			if (!response) {
				return response.status(401).json({
					message: "Authentication failed",
				});
			} else {
				let jwtToken = jwt.sign(
					{
						email: getUser.email,
						userId: getUser.userId,
						name: getUser.name,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
					}
				);
				return res.status(200).json({
					accessToken: jwtToken,
					userId: getUser.userId,
					message: "login successful",
				});
			}
		})
		.catch((err) => {
			return res.status(401).json({
				message: err.message,
				success: false,
			});
		});
});

module.exports = { register, login };
