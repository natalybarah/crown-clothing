import { USER_ACTION_TYPES } from "../user/user.types"

const INITIAL_STATE= {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer= (state = INITIAL_STATE, action)=>{
    const {type, payload}= action;
    
    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        return{
            ...state,
            currentUser: payload
        }
        case USER_ACTION_TYPES.SIGN_UP_FAILURE:
        case USER_ACTION_TYPES.SIGN_OUT_USER_FAILURE:
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
            return {
                ...state,
                error: payload,
            }
        case USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS:
            return{
                ...state,
                currentUser: null,
            }
        default:
            return state
    }
}

