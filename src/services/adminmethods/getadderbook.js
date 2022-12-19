import { prisma } from "../../index.js";
import {
	okResponse,
	notFoundResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getall_newbooks(req, res, next) {
	try {
		const newbooks = await prisma.bookadder.findMany({
			select: {
				id: true,
				title: true,
				author: true,
				description: true,
				publisheddate: true,
			},
		});
		const publisherdata = await prisma.publisher.findMany({
			where: {
				id: newbooks.publisherid,
			},
			select: {
				fname: true,
				lname: true,
				company: true,
			},
		});
		if (!publisherdata) {
			notFoundResponse(res, " publisher not Found ");
		}
		const categoryname = await prisma.category.findFirst({
			where: {
				id: newbooks.categoryid,
			},
			select: {
				name: true,
			},
		});
		if (!categoryname) {
			notFoundResponse(res, " categoryname not Found ");
		}
		if (newbooks) {
			return okResponse(res, "fetch books successfully ", {
				...newbooks,
			});
		}
	} catch (err) {
		next();
	}
}
