import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function pub_book_req(req, res, next) {
	try {
		const { title, author, category, description } = req.body;
		const categoryid = await prisma.category.findFirst({
			where: {
				name: category,
			},
		});
		if (!categoryid) {
			const categories = await prisma.category.findMany({
				select: {
					name: true,
				},
			});
			return okResponse(
				res,
				"category not found choose category of ",
				categories,
			);
		}
		const newbook = await prisma.bookadder.create({
			data: {
				title,
				author,
				categoryid: categoryid.id,
				publisherid: 1,
				description,
				publisheddate: new Date(),
			},
		});
		if (newbook) {
			return okResponse(res, "ok wait admin accept reqeust", newbook);
		} else {
			return badRequestResponse(res, "Error happen try again");
		}
	} catch (err) {
		console.log(err);
		badRequestResponse(res, err);
		next();
	}
}
