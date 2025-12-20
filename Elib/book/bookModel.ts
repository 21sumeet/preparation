import mongoose,  { Document } from "mongoose";
import type { User } from "../user/userModel.ts";

export interface Book{
    title :string , 
    description:string , 
    author :User,
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema = new mongoose.Schema<Book>({
    title :{
        type :String,
        require : true
    },
    description:{
        type : String , 
        require :true,
        maxlength :[200 , "max length of description is 200"],
        minlength :[10 , "min length of description is 10 atleast"]
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        require :true,
    },
    coverImage:{
        type :String,
        require :true
    },
    file:{
        type :String,
        require :true,
    },
    genre:{
        type:String,
        require:true,
    }
},{timestamps:true})

export default mongoose.model<Book>("Book", bookSchema);