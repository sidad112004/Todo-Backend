import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unqiue: true
    },  

    password: {
        type: String,
        required: true
    },

    fullname: {
        type: String
    },

    email: {
        type: String
    },

    RefreshToken: {
        type: String
    }

}, { timestamps: true })

Userschema.pre("save", async function () {
    if (!this.isModified("password")) { 

     }
     else{
       
    this.password = await bcrypt.hash(this.password, 10)

   
     }
})


Userschema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username

        },
        process.env.REFRESH_TOKEN_SECREAT,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPRIARY
        }
    )
}

Userschema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
 
export const User = mongoose.model("User", Userschema)