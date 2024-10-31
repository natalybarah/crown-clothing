import {createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

export const UserContext= createContext({
//default value
    currentUser: null, // Because we want to check if we have a user, and if we put empty, it equals to true
    setCurrentUser: () => null,

});
export const UserProvider = ({children}) => {
    /* We know that we want to store our user object, 
    so what we can do because this is a component is to use all of our hooks 
    that allow us to store things, so we import useState */
    const [currentUser, setCurrentUser] = useState(null);

    /* Now we want to generate the value that we are going to pass, we want it
    to be an object */
    const value= {currentUser, setCurrentUser}
    //signOutUser();

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
//this use effects gets fired because if for example we sign out, then the auth changes 
//the moment that this listener mounts it will check the auth state automatically when you
//initialize the listener and will run tye call back once, any future runs of this call bakc
//is gonna be tied directly to the actual auth states changing 


//we render the children. the children are the one that need access to the values. 
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
    /* so what happens here is that we are letting the children component
    have access to any of the values stored inside of our useState*/
};


