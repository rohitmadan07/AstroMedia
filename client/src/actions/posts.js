import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH ,CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING} from '../constants/actionTypes';
import * as api from "../api/index.js";

//From Here We will make calls to the backend, We get necesaary info from the client side and make an api call to the backend. 

export const getPost = (id) => async (dispatch) => {
  //redux thunk allows to put an additional arrow function to use async await capabilities
  try {
    dispatch({type:START_LOADING});

    const { data  } = await api.fetchPost(id); //data -> posts

    dispatch({ type: FETCH_POST, payload: {post:data} }); //payload sent to reducer
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page); 
    //data->posts
    
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async(dispatch)=>{
  try {
    dispatch({type:START_LOADING});
    const { data:{data} } = await api.fetchPostsBySearch(searchQuery);

    dispatch({type: FETCH_BY_SEARCH, payload: { data }});
    dispatch({type:END_LOADING});
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data } = await api.createPost(post); //making a post api request to our backend

    //dispatch an action
    dispatch({ type: CREATE, payload: data });
    navigate(`/posts/${data._id}`);

  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    //dispatch an action
    dispatch({ type: UPDATE, payload: data }); //payload here is the updatedpost
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async(dispatch) => {
  try {

    await api.deletePost(id); //Not interested in return data
    dispatch({type:DELETE, payload: id});

  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.likePost(id,user?.token);

    //dispatch an action
    dispatch({ type: LIKE, payload: data }); //payload here is the updatedpost
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (value,id) => async(dispatch) =>{
  try {
    const {data} = await api.comment(value,id);
    
    dispatch({type:COMMENT, payload: data}); //comments:['comment']
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
