import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";


const createuser = async(req:Request , res:Response , next:NextFunction)=>{
    //validation 
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        const error = createHttpError(400 , "All field is required ");
        return next(error);
    }
}

export {createuser};