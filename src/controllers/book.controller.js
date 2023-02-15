import { Router } from "express";
//-------functions-----
import * as book from "../services/books/index.js";
import JoiMiddleware from "../helpers/middlewares/Joimiddleware.js";
import bookid from "../helpers/schema/bookid.schema.js";
import update from "../helpers/schema/updatebook.schema.js";

const books = Router();
//----------book data--------
books.get("/getall/:year", book.getTopyear);
books.get("/get/:id", book.getbyID);
books.get("/getbook/?name", book.getbyName);
books.get("/gettop/:year/:month", book.getTop);
books.patch("/updatebook", JoiMiddleware(update), book.updatebook);
books.delete("/deletebook", JoiMiddleware(bookid), book.deletebook);

export default books;
