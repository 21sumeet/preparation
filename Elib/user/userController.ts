import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";
import userModel from "./userModel.ts";
import bcrypt from "bcrypt";
//import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { config } from "../config/config.ts";
import { match } from "assert";

const createuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, age } = req.body;

    // validation
    if (!name || !email || !password || !age) {
      return next(createHttpError(400, "All fields are required"));
    }

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(
        createHttpError(409, "User already exists with this email")
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      age
    });

    // generate JWT
    const token = sign(
      { sub: newUser._id.toString() },
      config.jwtSecret as string,
      {
        expiresIn: "7d",
        algorithm: "HS256"
      }
    );

    // send response
    res.status(201).json({
      message: "User created successfully",
      accessToken: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age
      }
    });
  } catch (error) {
    next(createHttpError(500, "Error while creating user"));
  }
};

const loginuser = async(req: Request, res: Response, next: NextFunction)=>{
  const { email , password} = req.body;
  if(!email ||!password){
    return next(createHttpError(400 , "All field are require "));
  }

  try {
    const user = await userModel.findOne({email});
  if(!user){
    return next(createHttpError(404 , "User is not found."));
  }

  const isMatch = await bcrypt.compare(password , user.password)
  if(!isMatch){
    return next(createHttpError(400, "Username or password incorrect!"))
  }
  const token = sign({ sub: user._id }, config.jwtSecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  //res.json({ accessToken: token });
  res.status(201).json({
      message: "User logged successfully",
      accessToken: token,
      user: {
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    next(createHttpError(500, "Error while loging user"));
  }
}

export { createuser , loginuser };
