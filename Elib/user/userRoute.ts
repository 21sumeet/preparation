import express, { type NextFunction, type Request, type Response } from"express";
import { createuser, loginuser } from "./userController.ts";
const Userrouter = express.Router();

Userrouter.post("/register" , createuser);
Userrouter.post("/login" , loginuser);

export default Userrouter;