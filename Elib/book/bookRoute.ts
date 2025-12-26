import express, { type NextFunction, type Request, type Response } from"express";
import path from "node:path";
import { createbook, updatebook } from "./bookController.ts";
import multer from "multer";
const Bookrouter = express.Router();

const upload = multer({
    dest:path.join(process.cwd(), "public/data/uploads"),
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
}).fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 2 }
])

Bookrouter.post("/",upload ,createbook );
Bookrouter.put("/updatebook/:id", upload ,updatebook )

export default Bookrouter;