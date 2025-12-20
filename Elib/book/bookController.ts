import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";

const createbook = async(req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message:"hello , create books here"
    })
}

export {createbook}