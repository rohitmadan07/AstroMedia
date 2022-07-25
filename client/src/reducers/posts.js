import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,COMMENT, FETCH_BY_SEARCH, START_LOADING,END_LOADING } from '../constants/actionTypes';

export default (state= {isLoading:true,posts:[]},action) =>{ 
    //states always have to be something, our posts are going to be an array
    switch(action.type){
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case FETCH_ALL:
            return {
                ...state, //spreading the object
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
             } 
        case FETCH_POST:
            return {...state, post:action.payload.post }; //getting a single post
        case FETCH_BY_SEARCH:
            return {...state, posts:action.payload.data };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return {...state,posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
        case LIKE:
            return {...state, posts:state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}; //updated post stored in action.payload
            //post will iterate over the posts array and when id matches it will update it.
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) =>{
                    if(post._id === action.payload._id){
                        return action.payload;
                    }
                    return post;
                }),
            };
        case DELETE:
            return {...state,posts:state.posts.filter((post) => post._id !== action.payload)};
            //keep all the posts except the one which has the id of toDelete Post
        default:
            return state;
    }
}