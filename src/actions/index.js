import {EMAIL_CHANGED
  ,PASSWORD_CHANGED
  ,LOGIN_USER_SUCESS
  ,LOGIN_USER_FAIL
  ,LOGIN_USER} from './types'
import firebase from 'firebase';
export const emailChanged = (text) =>{
  return{
      type:EMAIL_CHANGED,
      payload:text
  };
};

export const passwordChanged = (text) =>{
  return{
      type:PASSWORD_CHANGED,
      payload:text
  };
};

const loginUserSuccess=(dispatch,user)=>{
  dispatch({type:LOGIN_USER_SUCESS,payload:user});
}
const loginUserFail=(dispatch)=>{
  dispatch({type:LOGIN_USER_FAIL});
}
export const loginUser =({email,password})=>{
  return (dispatch)=>{
    dispatch({type:LOGIN_USER});

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(user=>loginUserSuccess(dispatch,user))
    .catch(()=>{
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(user=>loginUserSuccess(dispatch,user))
      .catch(()=>loginUserFail(dispatch));
    });
  };
};
