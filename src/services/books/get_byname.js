import axios from "axios";
import {
	okResponse,
	ErrorResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getbyName(req, res, next) {
	try {
		const apikey = process.env.XRapidAPIKey;
		const hostkey = process.env.XRapidAPIHost;
		const { name } = req.query;
		//name.toString();
		const options = {
			method: "GET",
			url: `https://hapi-books.p.rapidapi.com/search/${name}`,
			headers: {
				"X-RapidAPI-Key": `${apikey}`,
				"X-RapidAPI-Host": `${hostkey}`,
			},
		};
		axios
			.request(options)
			.then(function (response) {
				//console.log(response.data);
				// if (response.data == 0) return okResponse(res, "NOT Found ");
				// else
				if (response.data.error_code) {
					return ErrorResponse(
						res,
						response.data.error_code,
						"Erro happend",
					);
				} else if (response.data.length === 0)
					return notFoundResponse(res, "NOT Found book");
				else
					return okResponse(
						res,
						"successfully fetch ",
						response.data,
					);
			})
			.catch(function (error) {
				console.error(error);
			});
	} catch (err) {
		console.log(err);
		next();
	}
}
