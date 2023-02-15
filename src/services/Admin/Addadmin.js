import { prisma } from "../../index.js";
import bycrpt from "bcrypt";
import createAccessToken from "../../helpers/functions/createAccestoken.js";
import {
	okResponse,
	badRequestResponse,
	unAuthorizedResponse,
} from "../../helpers/functions/ResponseHandler.js";
export async function addadmin(req, res, next) {
	try {
		const { fname, lname, email, password, role } = req.body;
		const encryptpassword = bycrpt.hashSync(password, 10);
		const Email = await prisma.admin.findFirst({
			where: {
				email,
			},
		});
		if (Email)
			return unAuthorizedResponse(
				res,
				`email already ${Email.role} in website`,
			);
		const newadmin = await prisma.admin.create({
			data: {
				email,
				fname,
				lname,
				role: role,
				password: encryptpassword,
			},
		});
		const newToken = await prisma.tokenaccess.create({
			data: {
				user_id: newadmin.id,
				user: "publisher",
			},
		});
		const accessToken = createAccessToken(newadmin.id, newToken.id);
		delete newadmin.password;
		if (newadmin)
			return okResponse(res, "ok , admin added into system", {
				...newadmin,
				accessToken,
			});
		else return badRequestResponse(res, " Erro to add admin ");
	} catch (err) {
		console.log(err);
		next();
	}
}
