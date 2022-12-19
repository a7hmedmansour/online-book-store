import Joi from "joi";
const addbook = Joi.object({
	bookid: Joi.number().integer().positive().required().messages({
		"number.integer": "Book ID Must Be Integer value",
		"number.positive": "Book ID Must Be positive value ",
		"any.required": "Book ID required ",
	}),
	title: Joi.string().min(2).required().messages({
		"string.empty": "Title cannot be an empty field",
		"string.min": "Title must be at least 2 characters long",
		"any.required": "Title is a required field",
	}),
	author: Joi.string().min(2).required().messages({
		"string.empty": "Author cannot be an empty field",
		"string.min": "Author  must be at least 2 characters long",
		"any.required": "Author  is a required field",
	}),
	description: Joi.string(),
	category: Joi.string().required().messages({
		"string.empty": "Category cannot be an empty field",
		"any.required": "Category  is a required field",
	}),
});
export default addbook;
