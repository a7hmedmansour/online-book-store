//main packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
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

//---Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

//----Router ----
app.use("/user", users);
app.use("/book", books);
app.use("/admin", admin);
app.use("/publisher", publisher);

//port
app.listen(process.env.Port, () => {
	console.log(`server conect on port ${process.env.Port}`);
});
export { prisma };
