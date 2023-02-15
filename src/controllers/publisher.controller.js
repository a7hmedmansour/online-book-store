import { Router } from "express";
import * as publishermethod from "../services/publisher/index.js";
//-------------JWT------
// import JWTpublish from "../helpers/strategy/publisher.strategy.js";
// import passport from "passport";

//-----------JOi-------------
import JoiMiddleware from "../helpers/middlewares/Joimiddleware.js";
import login from "../helpers/schema/login.schema.js";
import publishersignup from "../helpers/schema/publisher.schema.js";
import addbook from "../helpers/schema/addbook.schema.js";
const publisher = Router();
publisher.get("/get/:id", publishermethod.get_pub_byid);
publisher.get("/get", publishermethod.getall);

publisher.post(
	"/login",
	JoiMiddleware(login),
	//passport.authenticate(JWTpublish, { session: false }),
	publishermethod.login,
);
publisher.post(
	"/signup",
	JoiMiddleware(publishersignup),
	publishermethod.signup_publisher,
);
publisher.post(
	"/publish",
	JoiMiddleware(addbook),
	publishermethod.pub_book_req,
);
export default publisher;
