import { prisma } from "../../index.js";
import bcyrpt from "bcrypt";
import {
	okResponse,
	badRequestResponse,
	unAuthorizedResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function signup(req, res, next) {
	try {
		const { fname, lname, email, password } = req.body;
		const hashpassword = bcyrpt.hashSync(password, 10);
		const Email = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (Email)
			return unAuthorizedResponse(
				res,
				"Email already sign up in website",
			);
		const newuser = await prisma.user.create({
			data: { fname, lname, email, password: hashpassword },
		});
		if (newuser) {
			return okResponse(res, "succfully sign up ", newuser);
		} else {
			return badRequestResponse(res, "Erro happen in sign up");
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
