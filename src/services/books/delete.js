import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function deletebook(req, res, next) {
	try {
		const { bookid } = req.body;
		const delbook = await prisma.books.delete({
			where: {
				id: bookid,
			},
		});
		if (delbook) return okResponse(res, "delete done");
		else badRequestResponse(res, "Error happend");
	} catch (err) {
		next();
	}
}
