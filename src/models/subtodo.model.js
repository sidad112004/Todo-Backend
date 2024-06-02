import mongoose from "mongoose";

const Subtodoschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    partoftodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        required:true
    }
}, 
{
    timestamps: true
})

export const Subtodo=mongoose.model("Subtodo",Subtodoschema)