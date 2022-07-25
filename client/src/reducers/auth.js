import * as actionType from '../constants/actionTypes';

const authReducer = (state = {authData:null},action)=>{ //default value of state null
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            //data in the action payload
            return {...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();
            return {...state, authData: null,loading: false, errors: null };
        default:
            return state;
    }
}

export default authReducer;