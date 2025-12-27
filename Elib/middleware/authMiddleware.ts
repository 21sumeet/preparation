import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";
import { config } from "../config/config.ts";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  userId?: string;
}

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createHttpError(401, "Authentication token missing"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
  return next(createHttpError(401, "Authentication token missing"));
}
  try{
    const decoded = jwt.verify(token, config.jwtSecret as string) as {
        sub:string;
    }
    req.userId = decoded.sub;
    next();
  }catch(err){
    console.log("error while token validation ",err);
    return next(createHttpError(401, "Invalid or expired token"));
  }

}

export {authenticate}

