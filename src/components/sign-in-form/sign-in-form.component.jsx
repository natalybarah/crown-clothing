import { useState} from "react";
import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { SignInContainer, ButtonsContainer} from "./sign-in-form.styles";
import {useDispatch} from 'react-redux'
import {emailSignInStart, googleSignInStart} from '../../store/user/user.action';


const defaultFormFields={
    email: '',
    password: '',
}
const SignInForm= ()=>{

    const dispatch= useDispatch()
    const [formFields, setFormFields]= useState(defaultFormFields);
    const {email, password}= formFields;
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
        try{
            dispatch(emailSignInStart(email, password));
            resetFormFields()
        } catch(error){
            console.log('user sign in failed', error)
        }
    }

    const googleSignIn = async()=> {
        dispatch(googleSignInStart());
    }

    const handleChange= (event)=>{
        const {value, name} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    return(
        <SignInContainer>
            <h2>Already have an account ? </h2> 
            <span>Sign in with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email} />
                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={googleSignIn} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>  
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;

