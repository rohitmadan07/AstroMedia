import express from "express";

import { getPost, getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/posts

router.get("/search",getPostsBySearch);
router.get("/", getPosts); //All users can see the post
router.get("/:id",getPost);

router.post("/", auth, createPost);
router.patch('/:id', auth, updatePost); //patch is used for updating existing document
//:id will be a dynamic id because for updation we need it. for creation we are always crating a new id
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
//we have auth before the functions where we would like the user to be authorized first (middleware)
//only 1 like per user

export default router;
