import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getall(req, res, next) {
	try {
		const publisher = await prisma.publisher.findMany({
			select: {
				fname: true,
				lname: true,
				email: true,
				phone: true,
				company: true,
			},
		});
		if (publisher) {
			return okResponse(res, " successfully fetch ", publisher);
		} else return badRequestResponse(res, "Error happen try agian ");
	} catch (err) {
		next();
	}
}
