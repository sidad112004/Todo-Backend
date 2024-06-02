import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connection =async ()=>{//async function returns a promise because we are using then aur ctach in index.js
    try {
        await mongoose.connect(`${process.env.DB_LINK}/${DB_NAME}`)
        console.log("Database is connected")
    }
     catch (error) {
        console.log("error connection database",error)
        process.exit(1)

    }
}
export {connection}