import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
import bcrypt from "bcrypt";

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const publisher = await prisma.publisher.findUnique({
			where: {
				email,
			},
		});
		if (!publisher) {
			return badRequestResponse(res, "Email Not Found In Website");
		}
		const matchpassword = await bcrypt.compare(
			password,
			publisher.password,
		);
		if (!matchpassword) {
			return badRequestResponse(res, "Incorrect Password");
		}
		delete publisher.password;
		if (matchpassword) {
			return okResponse(res, "Logged in successfully", publisher);
		}
	} catch (err) {
		next();
	}
}
