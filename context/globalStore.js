import { View, Text } from 'react-native'
import React, { createContext, useContext, useLayoutEffect, useReducer } from 'react'
import { initialState, taskReducer } from '../state/reducers/taskReducer';
import { FETCHING_START, FETCHING_SUCCESS } from '../state/actionTypes/taskActionsTypes';

export const STORE_CONTEXT = createContext();

export default function GlobalStore({children,}) {
   

    const [state , dispatch] = useReducer(taskReducer,initialState) 

    useLayoutEffect(() => {
      dispatch({type : FETCHING_START})
      fetch("https://my-todo-server-sage.vercel.app/userData")
        .then((res) => res.json())
        .then((data) => {
          dispatch({type : FETCHING_SUCCESS , payload : data});
        }).catch((err) => {
          dispatch({type : FETCHING_ERROR})
        })
    }, []);




    const storeInfo = {
      state ,
       dispatch
  };
  return (
    <STORE_CONTEXT.Provider value={storeInfo}>
      {children}
    </STORE_CONTEXT.Provider>
  )
}

export const useGStore = () =>{
  const contextStore = useContext(STORE_CONTEXT);
  return contextStore;
}