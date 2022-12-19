import { prisma } from "../../index.js";
import {
	okResponse,
	notFoundResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function getbyid_newbooks(req, res, next) {
	try {
		const { id } = req.params;
		const newbooks = await prisma.bookadder.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				id: true,
				title: true,
				author: true,
				description: true,
				publisherid: true,
				publisheddate: true,
			},
		});
		if (!newbooks) return notFoundResponse(res, " book not Found ");
		const publisherdata = await prisma.publisher.findUnique({
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
				...categoryname,
				publisherdata,
			});
		} else badRequestResponse(res, " error occurred ");
	} catch (err) {
		console.log(err);
		next();
	}
}
