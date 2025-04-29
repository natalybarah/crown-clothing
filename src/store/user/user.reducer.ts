import {AnyAction} from 'redux';
import { signInSucess, signUpFailure, signOutUserFailure, signInFailure, signOutSuccess  } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState={
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: Error | null
}

const INITIAL_STATE: UserState= {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer= (state = INITIAL_STATE, action: AnyAction)=>{
    if(signInSucess.match(action)){
        return{
            ...state,
            currentUser: action.payload
        }
    }
    if(signUpFailure.match(action) || signOutUserFailure.match(action) || signInFailure.match(action)){
        return {
            ...state,
            error: action.payload,
        }
    }
    if(signOutSuccess.match(action)){
        return{
            ...state,
            currentUser: null,
        }
    }
    return state;
}

