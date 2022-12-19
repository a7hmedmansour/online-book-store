import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
	Responsedone,
} from "../../helpers/functions/ResponseHandler.js";
export async function get_publisher_req(req, res, next) {
	try {
		const publisher = await prisma.publisher.findMany({
			where: {
				status: "Pending",
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
		} else if (Object.keys(publisher).length == 0)
			return Responsedone(res, " There are no requests ");
	} catch (err) {
		badRequestResponse(res, "Error occurred ");
		next();
	}
}
