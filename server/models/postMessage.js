import mongoose from "mongoose";

//creating mongoose schema

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String, //will automatically be got once logged in, Not required explicitly now
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type:[String], //Array O fIds
        default: [],
    },
    comments:{type:[String], default: []},
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
     },
}); //each post will have these things

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage; //exporting mongoose model for a post