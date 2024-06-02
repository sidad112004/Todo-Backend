import { Router } from "express";

import { userregister ,userlogin,userlogout} from "../controller/user.controller.js";

import { verifyjwt } from "../middleware/auth.middleware.js";

import { todolist ,createtodolist,deletetodolist,upadatetodo } from "../controller/todo.controller.js";

const router=Router()

router.route('/register').post(userregister)

router.route('/login').post(userlogin)

router.route('/logout').post(verifyjwt,userlogout)

router.route('/todo').post(verifyjwt,todolist)

router.route('/todo/create').post(verifyjwt,createtodolist)

router.route('/todo/delect').post(verifyjwt,deletetodolist)

router.route('/todo/update').post(verifyjwt,upadatetodo)





export default router