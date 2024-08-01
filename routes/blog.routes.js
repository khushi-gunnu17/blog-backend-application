import express from "express";
import multer from "multer";
import Blog from "../models/blog.models.js";
import path from "path"

const router = express.Router()


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }

})

const upload = multer({ storage })


router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user : req.user
    })
})



router.post('/', upload.single("coverImage"), async(req, res) => {

    const {title, body} = req.body

    const blog = await Blog.create({
        title,
        body,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    })

    res.redirect(`/blog/${blog._id}`)
})


export default router