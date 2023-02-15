import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import createAccessToken from "../../helpers/functions/createAccestoken.js";
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
		const newToken = await prisma.tokenaccess.create({
			data: {
				user_id: admin.id,
				user: "publisher",
			},
		});
		const accessToken = createAccessToken(admin.id, newToken.id);
		delete admin.password;
		if (matchpassword) {
			return okResponse(res, "successfull login", {
				...admin,
				accessToken,
			});
		} else return badRequestResponse(res, "password Not correct ");
	} catch (err) {
		badRequestResponse(res, "Error happend try again");
		next();
	}
}
