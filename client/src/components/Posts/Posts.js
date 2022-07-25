import React from "react";
import { Grid,CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux"; //fetch data from global redux store

import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({setCurrentId}) => {
  // const reduxState =  useSelector((state) => state);
  const {posts,isLoading} = useSelector((state) => state.posts); // .posts => name as specified in reducers ->fetching the posts
  // const posts = reduxState.posts;
  const classes = useStyles();

  if(!posts.length && !isLoading) return 'No Posts Found';

  return (
    isLoading ? <CircularProgress/> : ( //if post length 0 show circular progress
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post)=>(
              <Grid key = {post._id} item xs = {12} sm = {12} md={6} lg={4}> 
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
        </Grid>
    )
  );
};

export default Posts;
