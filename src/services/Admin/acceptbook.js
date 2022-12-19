//Accept add books from adderbooks
import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function Accept_addbook(req, res, next) {
	try {
		const { bookid } = req.body;
		const newbook = await prisma.bookadder.findUnique({
			where: {
				id: bookid,
			},
		});
		if (!newbook) return notFoundResponse(res, "not Found book request");
		const add = await prisma.books.create({
			data: {
				title: newbook.title,
				author: newbook.author,
				price: newbook.price,
				categoryid: newbook.categoryid,
				publisherid: newbook.publisherid,
				description: newbook.description,
			},
		});
		if (add) {
			await prisma.bookadder.delete({
				where: {
					id: bookid,
				},
			});
			return okResponse(res, "add book done", add);
		} else return badRequestResponse(res, "Error in add book");
	} catch (err) {
		next();
	}
}
