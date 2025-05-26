import { USER_ACTION_TYPES } from "./user.types"
import {Action, ActionWithPayload, createAction, withMatcher} from '../../utils/reducer/reducer.utils';
import { User } from "firebase/auth";
import { AdditionalInformation, UserData } from "../../utils/firebase/firebase.utils";

export type SetCurrentUser= ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, User>
export const setCurrentUser= (user: User) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)


export type CheckUserSession= Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export const checkUserSession= withMatcher((): CheckUserSession=> createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export type GoogleSignInStart= Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export const googleSignInStart= withMatcher((): GoogleSignInStart=> createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export type EmailSignInStart= ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>
export const emailSignInStart= withMatcher((email: string, password: string): EmailSignInStart=> createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password})); 

export type SignInSucess= ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export const signInSucess= withMatcher((user: UserData & {id: string} ): SignInSucess=> createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>
export const signInFailure= withMatcher((error: Error): SignInFailure => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error));

export type SignUpUserStart= ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_USER_START, {email: string, password: string, displayName: string}>
export const signUpUserStart= withMatcher((email: string, password: string, displayName: string): SignUpUserStart => createAction(USER_ACTION_TYPES.SIGN_UP_USER_START, {email, password, displayName}));

export type SignUpSuccess= ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: User, additionalInformation: AdditionalInformation}>
export const signUpSuccess= withMatcher((user: User, additionalInformation: AdditionalInformation): SignUpSuccess=> createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalInformation}));

export type SignUpFailure= ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILURE, Error>
export const signUpFailure= withMatcher((error: Error): SignUpFailure=> createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error));

export type SignOutStart= Action<USER_ACTION_TYPES.SIGN_OUT_USER_START>
export const signOutStart= withMatcher((): SignOutStart=> createAction(USER_ACTION_TYPES.SIGN_OUT_USER_START));

export type SignOutSuccess= Action<USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS>
export const signOutSuccess= withMatcher(()=> createAction(USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS));

export type SignOutUserFailure= ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_USER_FAILURE, Error>
export const signOutUserFailure = withMatcher((error: Error): SignOutUserFailure => createAction(USER_ACTION_TYPES.SIGN_OUT_USER_FAILURE, error));