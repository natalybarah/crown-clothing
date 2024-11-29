
import {createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

export const UserContext= createContext({
//default value
    currentUser: null, // Because we want to check if we have a user, and if we put empty, it equals to true
    setCurrentUser: () => null,

});
export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

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
               console.log(user);
            }

            
        );
        return unsubscribe;
    }, []) //whenever the component umounts, unsubscribe


    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
};


