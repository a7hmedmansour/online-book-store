import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const signschema = Joi.object({
	fname: Joi.string().min(1).required().messages({
		"string.empty": "First Name cannot be an empty field",
		"string.min": "Name must be at least 2 characters long",
		"any.required": "Name is a required field",
	}),
	lname: Joi.string().min(1).required().messages({
		"string.empty": "Last Name cannot be an empty field",
		"string.min": "Name must be at least 2 characters long",
		"any.required": "Name is a required field",
	}),
	email: Joi.string().email().required().messages({
		"string.email": "Email must be a valid email",
		"string.empty": "Email cannot be an empty field",
		"any.required": "Email is a required field",
	}),
	password: JoiPassword.string()
		.min(8)
		.minOfLowercase(1)
		.minOfUppercase(1)
		.minOfNumeric(1)
		.required()
		.messages({
			"string.empty":
				"Password cannot be an empty  please enter your password",
			"password.minOfLowercase":
				"Password must contain at least 1 lowercase letter",
			"password.minOfUppercase":
				"Password must contain at least 1 uppercase letter",
			"password.minOfNumeric": "Password must contain at least 1 number",
			"string.min": "Password must be at least 8 characters long",
			"any.required": "Password is a required field",
		}),
	company: Joi.string().required().messages({
		"string.empty": "company Name cannot be an empty field",
		"any.required": "company Name is a required field",
	}),
	phone: Joi.string()
		.regex(/^01[0125][0-9]{8}$/)
		.required()
		.messages({
			"string.empty": "Phone number cannot be an empty field",
			"object.regex": "Phone number Not valid ",
			"any.required": "Phone number is a required field",
		}),
});

export default signschema;
