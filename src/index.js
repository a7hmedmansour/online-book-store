//main packages
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.listen(process.env.Port, () => {
	console.log(`server conect on port ${process.env.Port}`);
});
export { prisma };
