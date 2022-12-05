import { internalServerErrorResponse } from "../functions/ResponseHandler.js";
export default function errorHandler(err, req, res, next) {
	if (err) {
		console.log(err);
		return internalServerErrorResponse(
			res,
			"internal Server Error : please back to Back End Team ",
		);
	}
	next();
}
