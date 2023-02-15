import { prisma } from "../../index.js";
import {
	okResponse,
	badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
import bcrypt from "bcrypt";
import createAccessToken from "../../helpers/functions/createAccestoken.js";

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
		const newToken = await prisma.tokenaccess.create({
			data: {
				user_id: publisher.id,
				user: "publisher",
			},
		});
		const accessToken = createAccessToken(publisher.id, newToken.id);
		delete publisher.password;
		if (matchpassword) {
			return okResponse(res, "Logged in successfully", {
				...publisher,
				accessToken,
			});
		}
	} catch (err) {
		next();
	}
}
