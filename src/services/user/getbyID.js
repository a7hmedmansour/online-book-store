import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getuserbyid(req, res, next) {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				fname: true,
				lname: true,
				email: true,
			},
		});
		if (user) {
			return okResponse(res, "fetch publisher successfully", user);
		} else {
			return notFoundResponse(res, "user Not Found ");
		}
	} catch (err) {
		console.log(err);
		badRequestResponse(res, "Error happen try again");
		next();
	}
}
