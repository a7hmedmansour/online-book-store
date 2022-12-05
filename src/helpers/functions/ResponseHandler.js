class ResponseHandler {
	constructor(status, message, data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
	sendeResponse(res) {
		return res.status(this.status).json({
			message: this.message,
			data: this.data,
		});
	}
}
export function okResponse(res, message, data = {}) {
	const response = new ResponseHandler(200, message, data);
	return response.sendeResponse(res);
}
export function badRequestResponse(res, message) {
	const response = new ResponseHandler(400, message);
	return response.sendeResponse(res);
}
export function internalServerErrorResponse(res, message) {
	const response = new ResponseHandler(500, message);
	return response.sendResponse(res);
}
