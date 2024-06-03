const Validator = require("validatorjs");

const validator = async (body, rules, customMessages, callback) => {
	const validation = new Validator(body, rules, customMessages);
	validation.passes(() => callback(null, true));
	validation.fails(() => callback(validation.errors, false));
};

const registerValidation = async (req, res, next) => {
	const validateRule = {
		name: "required|string|min:3",
		email: "required|email",
		password: "required|max:200|min:8",
	};

	await validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed, invalid fields for name email password",
				data: err,
			});
		} else {
			next();
		}
	}).catch((err) => console.log(err));
};

const loginValidation = async (req, res, next) => {
	const validateRule = {
		email: "required|email",
		password: "required|min:8",
	};

	await validator(req.body, validateRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	}).catch((err) => console.log(err));
};

module.exports = {
	registerValidation,
	loginValidation,
};
//module.exports = Valiodator;
