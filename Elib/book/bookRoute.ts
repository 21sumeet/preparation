import express, { type NextFunction, type Request, type Response } from"express";
import path from "node:path";
import { createbook, listBooks, updatebook } from "./bookController.ts";
import multer from "multer";
import { authenticate } from "../middleware/authMiddleware.ts";
const Bookrouter = express.Router();

const upload = multer({
    dest:path.join(process.cwd(), "public/data/uploads"),
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
}).fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 2 }
])

Bookrouter.post("/",authenticate,upload ,createbook );
Bookrouter.put("/updatebook/:id",authenticate , upload ,updatebook )

Bookrouter.get("/", listBooks);
//Bookrouter.get("/:bookId", getSingleBook);

export default Bookrouter;