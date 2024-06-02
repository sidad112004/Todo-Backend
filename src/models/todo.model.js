import mongoose from "mongoose";

const Todoschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
        
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    completed:{
        type:Boolean,
        default:false
    }
 
},{timestamps:true})

export const Todo=mongoose.model("Todo",Todoschema)