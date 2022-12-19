import { prisma } from "../../index.js";
import {
	badRequestResponse,
	okResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function updatebook(req, res, next) {
	try {
		const { bookid, title, author, category, description } = req.body;
		const categoryid = await prisma.category.findFirst({
			where: {
				name: category,
			},
		});
		const newversion = await prisma.books.updateMany({
			where: {
				id: bookid,
			},
			data: {
				title,
				author,
				description,
				publisherid: 2,
				categoryid: categoryid.id,
			},
		});
		console.log(newversion);
		if (newversion) return okResponse(res, " update Done ");
		else return badRequestResponse(res, "Error happend ");
	} catch (err) {
		next();
	}
}
