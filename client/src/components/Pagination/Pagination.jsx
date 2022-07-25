import React, {useEffect} from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts.js";

import useStyles from "./styles.js";

const Paginate = ({page})=>{ //React Paginate Component
    const classes = useStyles();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state)=>state.posts);

    useEffect(()=>{
        if(page) dispatch(getPosts(page)); //Now we want getPosts to get the posts on the 'page' only
    },[page]);

    return (
        <Pagination
            classes={{ul:classes.ul}}
            count = {numberOfPages}
            page={Number(page)||1}
            variant = "outlined"
            color="primary"
            renderItem={(item)=>( //item ->prop
                <PaginationItem {...item} component={Link} to={`?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate