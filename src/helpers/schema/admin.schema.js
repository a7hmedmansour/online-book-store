import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const adminschema = Joi.object({
	fname: Joi.string().required().messages({
		//.min(2)
		"string.empty": "Name cannot be an empty field",
		//"string.min": "Name must be at least 2 characters long",
		"any.required": "Name is a required field",
	}),
	lname: Joi.string().required().messages({
		//.min(2)
		"string.empty": "Name cannot be an empty field",
		//"string.min": "Name must be at least 2 characters long",
		"any.required": "Name is a required field",
	}),
	email: Joi.string().email().required().messages({
		"string.email": "Email must be a valid email",
		"string.empty": "Email cannot be an empty field",
		"any.required": "Email is a required field",
	}),
	Password: JoiPassword.string()
		.min(8)
		.minOfLowercase(1)
		.minOfUppercase(1)
		.minOfNumeric(1)
		.required()
		.messages({
			"string.empty": "Password cannot be an empty field",
			"password.minOfLowercase":
				"Password must contain at least 1 lowercase letter",
			"password.minOfUppercase":
				"Password must contain at least 1 uppercase letter",
			"password.minOfNumeric": "Password must contain at least 1 number",
			"string.min": "Password must be at least 8 characters long",
			"any.required": "Password is a required field",
		}),
});
export default adminschema;
