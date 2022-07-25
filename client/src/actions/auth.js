import { AUTH } from '../constants/actionTypes';
import * as api from "../api";

//Functions that return action
//redux-thunk
export const signin = (formData,navigate) => async(dispatch) =>{
    try {
        //sign in the user
        const {data} = await api.signIn(formData);

        dispatch({type:AUTH, data}); // to the reducer

        navigate('/');
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
}

export const signup = (formData,navigate) => async(dispatch) =>{
    try {
        //signup the user
        const {data} = await api.signUp(formData);

        dispatch({type:AUTH, data}); // to the reducer

        navigate('/');
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
}