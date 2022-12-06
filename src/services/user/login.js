import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
import bcrypt from "bcrypt";

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return badRequestResponse(res, "Email Not Found In Website");
		}
		const enbcyrptpassword = await bcrypt.compare(password, user.password);
		if (!enbcyrptpassword) {
			return badRequestResponse(res, "Incorrect Password");
		}
		delete user.password;
		if (user && enbcyrptpassword) {
			return okResponse(res, "Logged in successfully", user);
		}
	} catch (err) {
		next();
	}
}
