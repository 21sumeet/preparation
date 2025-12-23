import mongoose,  { Document } from "mongoose";

export interface User{
    _id :string ,
    name : string ,
    email : string,
    password :string,
    age:number
}

const userSchema = new mongoose.Schema<User>({
    name :{
        type : String,
        required : [true , "name is required"] ,
        trim :true ,
        minlength : [2 , "minimum length of name should be at least 2"],
        maxlength :  [12 , "maximum length of name should be at most 12"],
    },
    email:{
        type :String,
        unique :true,
        required :  [true , "email is required"] ,
        lowercase: true,
        trim: true,
        match :[
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email"
      ],
    },
    password:{
        type :String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        //select: false
    },
    age:{
        type :Number,
        required :true,
        min: [10, "Age must be at least 13"],
       max: [120, "Age must be below 120"]
    }
}, { timestamps: true });
export default mongoose.model<User>("User", userSchema);