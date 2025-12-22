import express, { type NextFunction, type Request, type Response } from"express";
import path from "node:path";
import { createbook } from "./bookController.ts";
import multer from "multer";
const Bookrouter = express.Router();

const upload = multer({
    dest:"../../public/data/uploads",
    limits: { fileSize: 20 * 1024 * 1024 } // 20 MB limit
}).fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 2 }
])

Bookrouter.post("/",upload ,createbook )

export default Bookrouter;