import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) =>{
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();

    const handleComment = async()=>{
        const newComments  = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        //sending who wrote the comment alomg with the comment and the id on which it was written.
        setComment(''); //data inside the text field
        setComments(newComments);

        commentsRef.current.scrollIntoView({behavior:'smooth'})
    };

    return(
        <div>
            <div className ={classes.commentsOuterContainer}>
                <div className ={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant = "h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/> 
                    {/* always going to scroll to this particular ref */}
                </div>
                {/* <br/> */}
                {user?.result?.name && (
                    <div style = {{width:'70%'}}>
                        <Typography gutterBottom variant = "h6">Write a Comment</Typography>
                        <TextField 
                            fullWidth
                            minRows={4}
                            maxRows={6}
                            variant="outlined"
                            label="Comments"
                            multiline
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                        <br/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentSection;