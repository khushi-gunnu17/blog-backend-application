import express from "express";
import path from "path"
import userRoutes from "./routes/user.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/auth.middlewares.js";
import Blog from "./models/blog.models.js";

const app = express()
const PORT = 8000


mongoose.connect('mongodb://localhost:27017/blogify')
.then(() => console.log(`Mongodb Connected`))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))


app.use('/user', userRoutes)
app.use('/blog', blogRoutes)


app.get('/', async (req, res) => {

    const allBlogs = await Blog.find({})

    res.render('home', {
        user : req.user,
        blogs : allBlogs
    })
})

app.listen(PORT, () => {
    console.log(`server started at port : ${PORT}`)
})