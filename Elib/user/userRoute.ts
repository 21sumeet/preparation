import express, { type NextFunction, type Request, type Response } from"express";
import { createuser } from "./userController.ts";
const Userrouter = express.Router();

Userrouter.post("/register" , createuser)

export default Userrouter;