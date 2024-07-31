import express from "express";
import path from "path"
import userRoutes from "./routes/user.routes.js"
import mongoose from "mongoose";

const app = express()
const PORT = 8000


mongoose.connect('mongodb://localhost:27017/blogify')
.then(() => console.log(`Mongodb Connected`))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use(express.urlencoded({extended : false}))


app.use('/user', userRoutes)


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`server started at port : ${PORT}`)
})