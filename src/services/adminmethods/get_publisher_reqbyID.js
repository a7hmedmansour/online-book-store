import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function get_publisherbyid_req(req, res, next) {
	try {
		const { id } = req.params;
		const publisher = await prisma.publisher.findFirst({
			where: {
				AND: { id: parseInt(id), status: "Pending" },
			},
			select: {
				id: true,
				fname: true,
				lname: true,
				company: true,
				email: true,
				phone: true,
			},
		});
		if (publisher) {
			return okResponse(
				res,
				"fetch successfully publisher request",
				publisher,
			);
		} else {
			return notFoundResponse(res, " Not found publisher request ");
		}
	} catch (err) {
		badRequestResponse(res, "Error occurred ");
		next();
	}
}
