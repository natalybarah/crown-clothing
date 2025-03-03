import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPES } from "../user/user.types"

export const setCurrentUser= (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const checkUserSession= ()=> createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart= ()=> createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart= (email, password)=> createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}); 

export const signInSucess= (user)=> createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)

export const signInFailure=(error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpUserStart= (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_USER_START, {email, password, displayName});

export const signUpSuccess= (user, additionalInformation)=> createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalInformation})

export const signUpFailure= (error)=> createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error);

export const signOutStart=()=> createAction(USER_ACTION_TYPES.SIGN_OUT_USER_START );

export const signOutSuccess= ()=> createAction(USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS);

export const signOutUserFailure = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_USER_FAILURE, error)