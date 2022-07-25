//all handlers for routes -> logic for routes -> done so that the routes file doesnt get too complex
//all the callback functions required in get request are put here
import express, { request } from 'express'
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; //database-> Mongoose Model

const router = express.Router();

//Query -> route looks like /posts?page=1  -> page=1 variable we are querying -> some page query
//Params -> route looks like /posts/123 -> id=123 -> params when want some specific post along with its id.

//Logic To Get Posts
export const getPosts = async(req, res) =>{
    const {page} = req.query;
    try {
        const LIMIT = 6; //no. of posts per page
        const startIndex = (Number(page)-1)*LIMIT; //start index of the startingpost in all pages
        const total = await PostMessage.countDocuments({}); //total number of posts

        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex); 
        //Newest posts first. Skipping all the posts upto startIndex

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)}); //sending this object to the frontend
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  }

  export const getPost = async(req,res) =>{
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
  }

  export const getPostsBySearch = async (req, res) => {

    const {searchQuery, tags}  = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); //i->ignore -> case insensitive search query

        const posts = await PostMessage.find({$or: [{title},{tags: {$in: tags.split(',')}}]});
        //$or -> either match by title or by tags.
        //Splitting by , becuase we joinde them in the frontend to send them in a string

        res.json({data: posts}); //sending back to frontend

    } catch (error) {
        res.status(404).json({message: error.message});
    }
  }

//Logic To Create Post
export const createPost = async(req,res)=>{
    const post = req.body;

    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toDateString()});

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

//Logic To Update Post
export const updatePost = async (req, res) => {
    const { id } = req.params; //id as _id ->aliasname
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

//Logic To Delete Post
export const deletePost = async(req,res) =>{
    const {id} = req.params; 

    //check whether id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message:"Post Deleted Successfully"});
}

//Logic To Like Post
export const likePost = async(req,res) =>{
    const {id} = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    //Id already in there -> it will be a dislike
    const index = post.likes.findIndex((id) => id===String(req.userId));

    if(index===-1){
        //like
        post.likes.push(req.userId);
    }
    else{
        //dislike
        post.likes = post.likes.filter((id) => id!==String(req.userId));
    }

    //Now post contains the like itself
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true});

    res.status(200).json(updatedPost);
}

//Logic for commentPost
export const commentPost = async(req,res) =>{
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);
    //finding the post on which comment is made

    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{new:true});

    res.json(updatedPost);
}

export default router;