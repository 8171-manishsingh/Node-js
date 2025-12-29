import cookieParser from "cookie-parser"
import express from "express"
import AuthRouter from "./router/auth.route.js"
import cors from "cors"
import connect from "./config/DB.js"
import BlogRouter from "./router/blog.route.js"
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use("/auth", AuthRouter)
app.use('/blog', BlogRouter)


app.listen(8080, async () => {
    try {
        await connect
        console.log("db connected")
        console.log("server is Started")
    } catch (error) {
        console.log(error)
    }
})



