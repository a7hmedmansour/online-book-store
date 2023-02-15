//main packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

//import axios from "axios";

//console.log(axios.isCancel("something"));
//----middleware---
import { logger } from "./helpers/middlewares/logger.js";
// ----- Controllers----
import users from "./controllers/user.controller.js";
import books from "./controllers/book.controller.js";
import admin from "./controllers/admin.controller.js";
import publisher from "./controllers/publisher.controller.js";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const initialpath = path.join(__dirname, "Online Book");
console.log("directory-name 👉️", initialpath);
//---Middleware
app.use(express.json());
app.use(cors());
// app.use(
// 	bodyParser.urlencoded({
// 		extended: true,
// 	}),
// );
app.use(bodyParser.json());
app.use(express.static("./Online Book"));
app.use(logger);

//----Router ----
app.use("/user", users);
app.use("/book", books);
app.use("/admin", admin);
app.use("/publisher", publisher);

app.get("/login", (req, res) => {
	if (req.method == "GET" && req.path == "/css/styles.css") {
		//res.sendFile(path.join(__dirname, "Online Book/css/styles.css"));
		res.sendFile(path.join(initialpath, "login.html"));
	}
});
app.get("/signup", (req, res) => {
	res.sendFile(path.join(initialpath, "signup.html"));
});

//port
app.listen(process.env.Port, () => {
	console.log(`server conect on port ${process.env.Port}`);
});
export { prisma };
