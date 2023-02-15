import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function get_pub_byid(req, res, next) {
	try {
		const { id } = req.params;
		const publisher = await prisma.publisher.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				fname: true,
				lname: true,
				email: true,
				company: true,
				status: true,
			},
		});
		if (publisher) {
			return okResponse(res, "fetch publisher successfully", publisher);
		} else {
			return notFoundResponse(res, "publisher Not Found ");
		}
	} catch (err) {
		badRequestResponse(res, "Error happen try again");
		next();
	}
}
