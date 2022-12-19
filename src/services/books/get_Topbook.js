import axios from "axios";
import {
	okResponse,
	ErrorResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getTop(req, res, next) {
	const { year, month } = req.params;
	const apikey = process.env.XRapidAPIKey;
	const hostkey = process.env.XRapidAPIHost;
	try {
		const options = {
			method: "GET",
			url: `https://hapi-books.p.rapidapi.com/month/${year}/${month}`,
			headers: {
				"X-RapidAPI-Key": `${apikey}`,
				"X-RapidAPI-Host": `${hostkey}`,
			},
		};
		axios
			.request(options)
			.then(function (response) {
				//console.log(response.data);
				if (response.data.error_code) {
					ErrorResponse(
						res,
						response.data.error_code,
						"Erro happend",
					);
				} else okResponse(res, "successfully fetch", response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	} catch (err) {
		console.log(err);
		next();
	}
}
