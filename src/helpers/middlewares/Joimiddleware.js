import { badRequestResponse } from "../functions/ResponseHandler.js";
export default function JoiMiddleware(schema) {
	return async (req, res, next) => {
		try {
			if (!schema) {
				throw new Error("schema is Required");
			}
			const value = await schema.validateAsync(req.body, {
				abortEarly: true,
				allowUnknown: false,
				convert: true,
			});
			req.body = value;
			next();
		} catch (err) {
			if (err.details) {
				const error = err.details.map((e) => e.message).join(",");
				return badRequestResponse(res, error);
			}
			next(err);
		}
	};
}
