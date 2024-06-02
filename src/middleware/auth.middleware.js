import ApiError from "../utilitis/ApiError.js";
import Asynchandler from "../utilitis/Asynchandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyjwt = Asynchandler(async (req, res, next) => {

    try {

        const token = await req.cookies?.RefreshToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(404, "unathroized action")
        }

        const decoded =  jwt.verify(token, process.env.REFRESH_TOKEN_SECREAT)

        if (!decoded) {
            throw new ApiError(400, "token is not verify")
        }

         const user = await User.findById(decoded._id).select("-password -RefreshToken")

       
        req.user = user

        if (!req.user) {
            throw new ApiError(400, "no req.user found")
        }

        next()

    }
    catch (error) {
        throw new ApiError(400, "user is not logged in")

    }
})

export { verifyjwt }