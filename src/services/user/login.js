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
		const newToken = await prisma.tokenaccess.create({
			data: {
				user_id: user.id,
				user: "user",
			},
		});
		const accessToken = createAccessToken(user.id, newToken.id);
		delete user.password;
		if (user && enbcyrptpassword) {
			return okResponse(res, "Logged in successfully", {
				...user,
				accessToken,
			});
		}
	} catch (err) {
		console.log(err);
		next();
	}
}
