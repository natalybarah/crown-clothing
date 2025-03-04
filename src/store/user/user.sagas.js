import {takeLatest, all, put, call} from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import { signInSucess, signInFailure, signUpSuccess, signUpFailure, signOutSuccess, signOutUserFailure} from './user.action';
import {getCurrentUser, signOutUser, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

export function* signInWithEmailSaga({payload: {email, password}}){
    try{
      const {user}=  yield call(signInAuthUserWithEmailAndPassword, email, password);
      yield call(getSnapshotFromUserAuth, user)
    } catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogleSaga(){
    try{
        const {user}= yield call(signInWithGooglePopup)
        console.log(user, 'este es el user SI Destructured')
        yield call(getSnapshotFromUserAuth, user)
    } catch(error){
        yield put(signInFailure(error))
    }
}

export function* getSnapshotFromUserAuth(userAuth, additionalInformation){
    try{
        const userSnapshot= yield call(createUserDocumentFromAuth, userAuth, additionalInformation)
        console.log(userSnapshot, 'este es userSnapshot');
        yield put(signInSucess({id: userSnapshot.id, ...userSnapshot.data()}))
        console.log(userSnapshot.data(), 'Datos del snapshot');
        console.log(userSnapshot.id, "este es el ID")
    } catch(error){
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth= yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch(error){
        yield put(signOutUserFailure(error))
    }
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const {user}= yield call(createAuthUserWithEmailAndPassword, email, password); 
        yield put(signUpSuccess(user, {displayName}))
    } catch(error){
        yield put(signUpFailure(error))
        if(error.code === 'auth/email-already-in-use'){
            alert(`We're sorry. There is another account associated with this Email`)
        } else {
            console.log('there has been an issue creating a new user')
        }
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInformation } }) {
    yield call(getSnapshotFromUserAuth, user, additionalInformation);
}
export function* onCheckInUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated  )
}
export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailSaga)
}
export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogleSaga)
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_USER_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp )
}
export function* onSignOutUserStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_USER_START, signOut)
}
export function* userSagas(){
    yield all([call(onCheckInUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpSuccess), call(onSignUpStart), call(onSignOutUserStart)])
}
