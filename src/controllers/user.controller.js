import { Router } from "express";
import * as usermethod from "../services/user/index.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log("directory-name 👉️", __dirname);
//-------------JWT------
// import strategy from "../helpers/strategy/jwt.strategy.js";
// import passport from "passport";
//------------JOI
import JoiMiddleware from "../helpers/middlewares/Joimiddleware.js";
import login from "../helpers/schema/login.schema.js";
import signup from "../helpers/schema/signup.schema.js";

const userrouter = Router();

userrouter.post("/login", JoiMiddleware(login), usermethod.login);
userrouter.post("/signup", JoiMiddleware(signup), usermethod.signup);
userrouter.get("/get/:id", usermethod.getuserbyid);
export default userrouter;
