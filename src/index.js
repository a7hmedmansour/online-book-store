//main packages
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

//----middleware---
import { logger } from "./helpers/middlewares/logger.js";
// ----- Controllers----
import users from "./controllers/user.controller.js";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

//---Middleware
app.use(express.json());
app.use(logger);

//-------------------- Router ----
app.use("/user", users);

//port
app.listen(process.env.Port, () => {
	console.log(`server conect on port ${process.env.Port}`);
});
export { prisma };
