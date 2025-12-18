import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";
import userModel from "./userModel.ts";
import bcrypt from "bcrypt"


const createuser = async(req:Request , res:Response , next:NextFunction)=>{
    //validation 
    const {name , email , password , age} = req.body;
    if(!name || !email || !password ||!age){
        const error = createHttpError(400 , "All field is required ");
        return next(error);
    }
    const user = await userModel.findOne({email : email});
    if(user){
        const error = createHttpError(400 , "user already exist ");
        return next(error);
    }
    //creating newuser
    const hashpassword =  await bcrypt.hash(password , 10);
    const newuser = await userModel.create({
        name ,
        email ,
        password : hashpassword,
        age
    })
    res.json({
        id:newuser._id,
        message :  `${newuser.name} is created`
    })

}

export {createuser};