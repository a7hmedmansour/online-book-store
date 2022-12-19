class ResponseHandler {
	constructor(status, message, data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
	sendeResponse(res) {
		return res.status(this.status).json({
			//status: this.status,
			message: this.message,
			data: this.data,
		});
	}
}
export function okResponse(res, message, data = {}, Data = []) {
	const response = new ResponseHandler(200, message, data, Data);
	return response.sendeResponse(res);
}
export function Responsedone(res, message) {
	const response = new ResponseHandler(200, message);
	return response.sendeResponse(res);
}
export function badRequestResponse(res, message) {
	const response = new ResponseHandler(400, message);
	return response.sendeResponse(res);
}
export function unAuthorizedResponse(res, message) {
	const response = new ResponseHandler(401, message);
	return response.sendeResponse(res);
}
export function ErrorResponse(res, status, message) {
	const response = new ResponseHandler(status, message);
	return response.sendeResponse(res);
}
export function notFoundResponse(res, message) {
	const response = new ResponseHandler(404, message);
	return response.sendeResponse(res);
}
export function internalServerErrorResponse(res, message) {
	const response = new ResponseHandler(500, message);
	return response.sendeResponse(res);
}
