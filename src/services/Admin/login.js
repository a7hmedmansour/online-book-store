import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const admin = await prisma.admin.findUnique({
			where: {
				email,
			},
		});
		const matchpassword = await bcrypt.compare(password, admin.password);
		delete admin.password;
		if (matchpassword) {
			return okResponse(res, "successfull login", admin);
		} else return badRequestResponse(res, "password Not correct ");
	} catch (err) {
		badRequestResponse(res, "Error happend try again");
		next();
	}
}
