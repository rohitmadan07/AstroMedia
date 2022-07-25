import React,{useState} from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useBouncyShadowStyles} from '@mui-treasury/styles/shadow/bouncy';
import cx from 'clsx';

import { deletePost, likePost } from "../../../actions/posts";

import useStyles from './styles';
const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const shadowStyles = useBouncyShadowStyles();

    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes,setLikes] = useState(post?.likes); //to update likes instantaneously

    const userId = user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);    

    const handleLike = async ()=>{
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
          } 
        else {
            setLikes([...post.likes, userId]);
          }
    };

    const Likes = () => {
        if (likes?.length >0) {
        return likes?.find((like) => like === userId)
            ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like</>; //else 
      };
    
    const openPost = () => navigate(`/posts/${post._id}`); //pushing to id of post that is currently selected
    const str = ".....Read More";

    return (
        <Card className={cx(classes.root, shadowStyles.root)} sx = {{margin:5}} raised elevation={6}>
        <ButtonBase component = "span" className={classes.cardAction} onClick = {openPost}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}> 
                {/* This represents the three dots which will be used to pass id */}
                    <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(post._id);
                    }} 
                        style={{ color: 'white' }} 
                        size="small">
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                {/* # implies string starting with # */}
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message.length>20 ? post.message.split(' ').splice(0,20).join(' '): post.message} <span className={classes.readMore}>{str}</span> </Typography> 
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button style ={{color:'#0104fe'}} size="small" disabled = {!user?.result} onClick = {handleLike}>
                    <Likes/>
                </Button>
                {(user?.result?._id === post?.creator) && (
                    <Button style ={{color:'rgb(255 0 0)'}} size="small" onClick = {()=> dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize = "small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;