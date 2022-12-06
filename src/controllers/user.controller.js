import { Router } from "express";
import * as usermethod from "../services/user/index.js";
const userrouter = Router();
userrouter.post("/login", usermethod.login);
userrouter.post("/signup", usermethod.signup);
export default userrouter;
