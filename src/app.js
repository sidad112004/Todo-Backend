import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
const app=express()

 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


 
  

app.use(cookieParser())
// When you use app.use, you are specifying that the middleware function should be called for every request that matches the specified path
app.use(express.json())
 


//it act as middelware where yo can check the the file is send follows the the type or not



import userrouter from "./router/userroute.route.js"


app.use('/users',userrouter)

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json(err)
})


export {app}