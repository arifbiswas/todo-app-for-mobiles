import { FETCHING_END, FETCHING_ERROR, FETCHING_START, FETCHING_SUCCESS } from "../actionTypes/taskActionsTypes";

export const initialState ={
    loading:false,
    data : [],
    error : false
}

export const taskReducer = (state, action) =>{
    switch(action.type){
        case FETCHING_START :
            return {
                ...state,
                loading:true,
            };
        case FETCHING_SUCCESS :
            return {
                ...state,
                loading : false,
                data : action.payload
            };
        case FETCHING_ERROR :
            return {
                ...state,
                loading : false,
                error : true
            };
        default: 
        return state;
    }
}