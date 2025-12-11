import mongoose from "mongoose";
import { config } from "./config.ts";

const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database connected succesfully")
        })
        mongoose.connection.on("error",(err)=>{
            console.log(`error while connecting to db ${err}`)
        })
        await mongoose.connect(config.databaseUrl as string);
        
    }catch(error){
        console.log(`Failed to connecting db: ${error}`);
        process.exit(1);
    }
}
export default connectDB;
