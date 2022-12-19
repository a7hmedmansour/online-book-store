import Joi from "joi";
const bookid = Joi.object({
	bookid: Joi.number().integer().positive().required().messages({
		"number.integer": "Book ID Must Be Integer value",
		"number.positive": "Book ID Must Be positive value ",
		"any.required": "Book ID required ",
	}),
});
export default bookid;
