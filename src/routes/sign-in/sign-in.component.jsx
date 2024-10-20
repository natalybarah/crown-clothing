import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn=()=>{
    const logInGoogle = async()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef= await createUserDocumentFromAuth(user)
        //const userAuth= response.uid;
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logInGoogle}>Sign in with Google Popup</button> 
        </div>
    )
}

export default SignIn;
