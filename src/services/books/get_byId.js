import axios from "axios";
import {
	okResponse,
	ErrorResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getbyID(req, res, next) {
	try {
		const apikey = process.env.XRapidAPIKey;
		const hostkey = process.env.XRapidAPIHost;
		const { id } = req.params;
		const options = {
			method: "GET",
			url: `https://hapi-books.p.rapidapi.com/book/${id}`,
			headers: {
				"X-RapidAPI-Key": `${apikey}`,
				"X-RapidAPI-Host": `${hostkey}`,
			},
		};
		axios
			.request(options)
			.then(function (response) {
				if (response.data.error_code) {
					ErrorResponse(
						res,
						response.data.error_code,
						"Erro happend",
					);
				} else okResponse(res, "succesfully fetch book", response.data);

				//console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	} catch (err) {
		console.log(err);
		next();
	}
}
