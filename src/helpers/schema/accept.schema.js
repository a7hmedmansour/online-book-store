import Joi from "joi";
const accept_publisher = Joi.object({
	id: Joi.number().integer().positive().required().messages({
		"number.integer": "publisher ID Must Be Integer value",
		"number.positive": "publisher ID Must Be positive value ",
		"any.required": "publisher ID required ",
	}),
	status: Joi.string()
		.required()
		.valid("reject", "Pending", "Accept")
		.messages({
			"any.required": " Type  is required",
			"string.empty": " Type  cannot be an empty field",
			"any.only": "Type  must be Accept Or Pending Or reject",
		}),
});
export default accept_publisher;
