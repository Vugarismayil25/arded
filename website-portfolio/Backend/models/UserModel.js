import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
 
    role: {
        type: String,
        enum: ["admin","superadmin"],
        default: "admin"
      },
      confirmPassword: {
        type: Number,
   
      },
   
})
export const UserModel =  mongoose.model("AdminUsers", UserSchema);