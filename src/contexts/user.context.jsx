import {createContext, useEffect, useReducer} from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext= createContext({
//default value
    currentUser: null, // Because we want to check if we have a user, and if we put empty, it equals to true
    setCurrentUser: () => null,

});
export const USER_ACTION_TYPES= {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer= (state, action)=>{
    console.log('dispatched')
    console.log(action);
    const {type, payload}= action;
    
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
        return{
            ...state,
            currentUser: payload
        }
        default:
            throw Error(`Unhandled type${type} in userReducer`)
    }


}

const INITIAL_STATE= {
    currentUser: null,
}

export const UserProvider = ({children}) => {

    //const [currentUser, setCurrentUser] = useState(null);
    const[{currentUser}, dispatch]= useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser, 'current user en user provider')
    // const {currentUser}= state; or we can also distructure it directly as above:
    
    const setCurrentUser=(user)=>{
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }


    const value= {currentUser, setCurrentUser}

    useEffect(()=>{
        const unsubscribe= onAuthStateChangedListener(
            (user)=>{
                if(user){
                    createUserDocumentFromAuth(user)
                }
                setCurrentUser(user); 
                /* what we want to store inside of our UserContext its if the user signs in, we want to store the 
                user object if they sign out, we want to set null.
                    - In here user is whatever the value of auth is. */
            }

            
        );
        return unsubscribe;
    }, []) //whenever the component umounts, unsubscribe


    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
};

