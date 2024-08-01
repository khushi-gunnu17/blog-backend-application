import mongoose from "mongoose";

const blogSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    body : {
        type : String,
        required : true
    },

    coverImageURL : {
        type : String,
        required : false
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

}, {timestamps : true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog