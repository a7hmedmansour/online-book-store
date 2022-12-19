import { Router } from "express";
import * as adminmethod from "../services/Admin/index.js";
import * as admintool from "../services/adminmethods/index.js";
//-----------JOi--------------
import JoiMiddleware from "../helpers/middlewares/Joimiddleware.js";
import login from "../helpers/schema/login.schema.js";
import add_admin from "../helpers/schema/add_admin.schema.js";
import bookid from "../helpers/schema/bookid.schema.js";
import accept_publisher from "../helpers/schema/accept.schema.js";

const admin = Router();
admin.post("/login", JoiMiddleware(login), adminmethod.login);
admin.post("/newadmin", JoiMiddleware(add_admin), adminmethod.addadmin);

admin.get("/admin/:id", adminmethod.getbyid);
//--------tool for publisher request
admin.get("/publisher", admintool.get_publisher_req);
admin.get("/publisher/:id", admintool.get_publisherbyid_req);

admin.post(
	"/publisher",
	JoiMiddleware(accept_publisher),
	adminmethod.accept_publisher,
);
//---------tools for add book request
admin.post("/newbook", JoiMiddleware(bookid), adminmethod.Accept_addbook); //accept add book in DB
admin.get("/newbook", admintool.getall_newbooks); //get all books
admin.get("/newbook/:id", admintool.getbyid_newbooks); //get new book by id
export default admin;
