import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getbyid(req, res, next) {
	try {
		const { id } = req.params;
		const admin = await prisma.admin.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				fname: true,
				lname: true,
				email: true,
			},
		});
		if (admin) {
			return okResponse(res, "Fetch successfully ", admin);
		} else return badRequestResponse(res, "Error happen try again");
	} catch (err) {
		console.log(err);
		next();
	}
}
