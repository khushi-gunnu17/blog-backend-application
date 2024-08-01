import express from "express";
import multer from "multer";
import Blog from "../models/blog.models.js";
import path from "path"
import Comment from "../models/comment.models.js";

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



router.get('/:id', async(req, res) => {

    const blog = await Blog.findById(req.params.id).populate("createdBy")

    const comments = await Comment.find({ blogId : req.params.id }).populate("createdBy")

    return res.render('blog', {
        user : req.user,
        blog,
        comments
    })

})




router.post('/comment/:blogId', async(req, res) => {

    await Comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id
    })

    return res.redirect(`/blog/${req.params.blogId}`)

})





router.post('/', upload.single("coverImage"), async(req, res) => {

    try {

        const {title, body} = req.body
        const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '';
    
        const blog = await Blog.create({
            title,
            body,
            createdBy : req.user._id,
            coverImageURL : coverImageURL
        })
    
        res.redirect(`/blog/${blog._id}`)

    } catch (error) {
        res.status(500).send('Server Error')
    }
})


export default router