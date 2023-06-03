import Blog from '../models/BlogModel.js'
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import Category from '../models/CategoryModel.js';
import mongoose from 'mongoose';

dotenv.config();
//create blog
export const createBlog=async(req,res)=>{
    const {title, slug, description, categoryData, user}=req.body;
    const {filename}= req.file;
    
        try{
            console.log(user);
            
            const data= jwt.verify(user, process.env.SECRET);
            const author=data.userId;
            const info=await Category.findOne({name:categoryData});
            const category=info._id;
            // console.log(author);

        const blog=await Blog.create({title,slug,image: filename, description,category,author});
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//Display All Blog
export const displayBlog= async(req, res) => {
    try{
        const blog= await Blog.find({});
        res.status(200).json(blog)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//Delete Blog
export const deleteBlog= async(req,res) => {
    const {id}= req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"No such blog"})
        }
        const blog= await Blog.findOneAndDelete({_id: id})
        res.status(200).json(blog);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}
