import { useState} from "react";
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import '../sign-in-form/sign-in-form.styles.scss';
import Button from '../button/button.component';
//import {UserContext} from '../../contexts/user.context';


const defaultFormFields={
    email: '',
    password: '',
}
const SignInForm= ()=>{

    const [formFields, setFormFields]= useState(defaultFormFields);
    const {email, password}= formFields;
    //  console.log(formFields);
    
    /*  
        We get rid of this set current user because we don't need it anymore, as we use the on auth state listener to 
        centralize everything in user context
        const {setCurrentUser} = useContext(UserContext)
    */

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit= async(event)=>{
        event.preventDefault();
        try {
        await signInAuthUserWithEmailAndPassword(email, password);
        //setCurrentUser(user);
        resetFormFields();
        } catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Wrong password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No email associated to an account');
                    break
                default:
                    console.log(error)
            }
                
        }
    }

    const googleSignIn = async()=>{
        try{
            await signInWithGooglePopup();
           }
        catch(error){
            if(error.code === 'auth/popup-closed-by-user'){
                alert('No Sign In with Google was made')
            }
        }

    }

    const handleChange= (event)=>{
        const {value, name} = event.target;
        setFormFields({...formFields, [name]: value})
    }


    return(
        <div>
                 

            <h2>Already have an account ? </h2> 
            <span>Sign in with your Email and Password</span>
            <form className='sign-in-container' onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email} />
                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />
                <div className='buttons-container'>
                    <Button  buttonType='' type='submit'>Sign In</Button>
                    <Button type='button' onClick={googleSignIn} buttonType='google'>Google Sign In</Button>  
                </div>
            </form>
           
        </div>
    )
}

export default SignInForm;

