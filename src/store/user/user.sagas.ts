import {takeLatest, all, put, call} from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import { SignUpSuccess, SignUpUserStart, signInSucess, signInFailure, signUpSuccess, signUpFailure, signOutSuccess, signOutUserFailure, EmailSignInStart} from './user.action';
import {getCurrentUser, signOutUser, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createAuthUserWithEmailAndPassword, AdditionalInformation } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export function* signInWithEmailSaga({payload: {email, password}}: EmailSignInStart){
    try{

      const userCredential=  yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if(userCredential){
            const {user} = userCredential
            yield* call(getSnapshotFromUserAuth, user)
        }
      
    } catch(error){
        yield* put(signInFailure(error as Error));
    }
}

export function* signInWithGoogleSaga(){
    try{
        const {user}= yield* call(signInWithGooglePopup)
        console.log(user, 'este es el user SI Destructured')
        yield* call(getSnapshotFromUserAuth, user)
    } catch(error){
        yield* put(signInFailure(error as Error))
    }
}

export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation){
    try{
        const userSnapshot= yield* call(createUserDocumentFromAuth, userAuth, additionalInformation)
        if(userSnapshot){
            yield* put(signInSucess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch(error){
        yield* put(signInFailure(error as Error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth= yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error){
        yield* put(signInFailure(error as Error))
    }
}

export function* signOut(){
    try{
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch(error){
        yield* put(signOutUserFailure(error as Error))
    }
}

export function* signUp({payload: {email, password, displayName}}: SignUpUserStart){
    try{
        const userCredential= yield* call(createAuthUserWithEmailAndPassword, email, password); 
        if(userCredential){
            const {user}= userCredential
            yield* put(signUpSuccess(user, {displayName}))
        }
    } catch(error){
        if(error instanceof FirebaseError){
            yield* put(signUpFailure(error))
            if( error.code === 'auth/email-already-in-use'){
                alert(`We're sorry. There is another account associated with this Email`)
            } else {
                console.log('there has been an issue creating a new user')
            }
        }
        
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInformation } }: SignUpSuccess ) {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);
}

export function* onCheckInUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated  )
}
export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailSaga)
}
export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogleSaga)
}

export function* onSignUpStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_USER_START, signUp)
}

export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp )
}
export function* onSignOutUserStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_USER_START, signOut)
}
export function* userSagas(){
    yield* all([call(onCheckInUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpSuccess), call(onSignUpStart), call(onSignOutUserStart)])
}
