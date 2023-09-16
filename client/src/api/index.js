//To make api calls
import axios from 'axios';

const API = axios.create({baseURL:'https://astromedia.el.r.appspot.com/'});

// const url = 'http://localhost:5000/posts'; //URL pointing to our backed route

API.interceptors.request.use((req)=>{
    //sending token to backend
    //Getting it verified from the middleware
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); 
export const createPost = (newPost) => API.post('/posts', newPost); //url, data
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`, updatedPost); //url, id -> which post to update
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


