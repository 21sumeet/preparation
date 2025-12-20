import express, { type NextFunction, type Request, type Response } from"express";
import type { HttpError } from "http-errors";
import { config } from "../config/config.ts";
import { rateLimit } from "express-rate-limit";
import Userrouter from "../user/userRoute.ts";
import Bookrouter from "../book/bookRoute.ts";

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


app.get("/", (req , res)=>{
    res.json({message:"hello from ebook api backend"})
})
app.use("/api/user" , Userrouter);
app.use("/api/book" , Bookrouter)



//global error handler
app.use((err :HttpError , req :Request ,res:Response , next:NextFunction)=>{
    const statuscode = err.statusCode || 500;
    res.status(statuscode).json({
        message : err.message,
        errorStack : config.env==="development" ? err.stack:"",
    })

})

export default app ;

