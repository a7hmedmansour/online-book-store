import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function signup_publisher(req, res, next) {
	try {
		const { fname, lname, email, company, password, phone } = req.body;
		const enbcyrptpassword = bcrypt.hashSync(password, 10);
		const Email = await prisma.publisher.findFirst({
			where: {
				email,
			},
		});
		if (Email)
			return badRequestResponse(
				res,
				`Email already sign up and is is ${Email.status}`,
			);
		const newpublisher = await prisma.publisher.create({
			data: {
				email,
				fname,
				lname,
				company,
				phone,
				password: enbcyrptpassword,
			},
		});
		delete newpublisher.password;
		if (newpublisher) {
			return okResponse(
				res,
				"ok , successfully submit req ",
				newpublisher,
			);
		} else return badRequestResponse(res, "Erro happen try again");
	} catch (err) {
		console.log(err);
		next();
	}
}
