import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
import createAccessToken from "../../helpers/functions/createAccestoken.js";
export async function accept_publisher(req, res, next) {
	try {
		const { id, status } = req.body;
		const publish = await prisma.publisher.findUnique({
			where: {
				id,
			},
		});
		if (!publish)
			return notFoundResponse(res, "not found publisher request");
		const newpubliher = await prisma.publisher.update({
			where: {
				id,
			},
			data: {
				status: status,
			},
		});
		delete newpubliher.password;
		if (newpubliher) {
			const newToken = await prisma.tokenaccess.create({
				data: {
					user_id: newpubliher.id,
					user: "publisher",
				},
			});
			const accessToken = createAccessToken(newpubliher.id, newToken.id);
			return okResponse(res, "accept publisher", {
				...newpubliher,
				accessToken,
			});
		} else return badRequestResponse(res, "Error happen try again");
	} catch (err) {
		console.log(err);
		next();
	}
}
