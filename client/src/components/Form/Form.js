import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    //postData ->initial state
    //object that we want to set the postData at the start
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)); //single post returned
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem('profile'));

  const clear = ()=>{
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  useEffect(()=>{ //used to populate the values of the form
    if(!post?.title) clear(); 
    if(post) setPostData(post);
  },[post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId===0){
      dispatch(createPost({...postData, name: user?.result?.name}, navigate)); 
      //dispatching createPost of actions and passing all the data from our state postData
    }
    else{
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    }
    clear();
  };

  if(!user?.result?.name){
    //no user logged in
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align = "center">
          Please Sign In To Create Or Like A Post.
        </Typography>
      </Paper>
    )
  }
  
  
  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Post'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth margin='normal' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth margin='normal' multiline minRows={4} maxRows={6} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (comma seperated)" fullWidth  margin='normal' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
            <FileBase
                type = "file"
                multiple ={false}  //need only one
                onDone = {({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                //by ...postData -> we are spreading the postData and then we set selectedfile
            />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
        <Button className = {classes.clear} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 

      </form>
    </Paper>
  )
}
export default Form;
