import mongoose,  { Document } from "mongoose";
import type { User } from "../user/userModel.ts";

export interface Book{
    title :string , 
    description:string , 
    author :mongoose.Types.ObjectId,
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema = new mongoose.Schema<Book>({
    title :{
        type :String,
        required : true
    },
    description:{
        type : String , 
        required :true,
        maxlength :[200 , "max length of description is 200"],
        minlength :[10 , "min length of description is 10 atleast"]
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :true,
    },
    coverImage:{
        type :String,
        required :true
    },
    file:{
        type :String,
        required :true,
    },
    genre:{
        type:String,
        required:true,
    }
},{timestamps:true})

export default mongoose.model<Book>("Book", bookSchema);