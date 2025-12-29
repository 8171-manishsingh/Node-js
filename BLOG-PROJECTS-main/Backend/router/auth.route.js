import express from "express"
import userController from "../controller/user.controller.js"
const AuthRouter = express.Router()


AuthRouter.post("/signup", userController.Signup)
AuthRouter.post("/signin", userController.Signin)
AuthRouter.post("/logout", userController.logout)


export default AuthRouter
