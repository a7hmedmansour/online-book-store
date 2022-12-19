import axios from "axios";
import {
	okResponse,
	ErrorResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getall(req, res, next) {
	try {
		const apikey = process.env.key;
		const options = {
			method: "GET",
			url: `https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=${apikey}`,
		};
		axios
			.request(options)
			.then(function (response) {
				//console.log(response.data);
				if (response.data)
					return okResponse(
						res,
						"successfully fetch ",
						response.data,
					);
				else return ErrorResponse(res, 404, "Erro 404 ");
			})
			.catch(function (error) {
				console.error(error);
			});
	} catch (err) {
		next();
	}
}
