import express, { type NextFunction, type Request, type Response } from"express";
import { createbook } from "./bookController.ts";
//import { createuser, loginuser } from "./userController.ts";
const Bookrouter = express.Router();

Bookrouter.post("/" ,createbook )

export default Bookrouter;