import express, { type NextFunction, type Request, type Response } from"express";
import type { HttpError } from "http-errors";
import { config } from "../config/config.ts";
const app = express();

app.get("/", (req , res)=>{
    res.json({message:"hello from ebook api backend"})
})


//global error handler
app.use((err :HttpError , req :Request ,res:Response , next:NextFunction)=>{
    const statuscode = err.statusCode || 500;
    res.status(statuscode).json({
        message : err.message,
        errorStack : config.env==="development" ? err.stack:"",
    })

})

export default app ;

