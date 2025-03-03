import { useState } from "react";
import {useDispatch} from 'react-redux';
import {signUpUserStart} from '../../store/user/user.action';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';
import { SignUpContainer } from "./sign-up-form.styles";;


const defaultFormFields={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm= ()=>{
    const dispatch= useDispatch();
    const [formFields, setFormFields]= useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}= formFields;


    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        try{
            dispatch(signUpUserStart(email, password, displayName));
            resetFormFields()
        } catch(error){
            if(error.code === 'auth/email-already-in-use') {
                alert(`Oops, you can't Sign in. This email is already in use.`)
            } else {
                console.log('encounter an issue when creating an user', error);
        }
        
        }
    }

    const handleChange= (event)=>{
        const {value, name} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account ? </h2> 
            <span>Sign up with your Password and Email</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Display Name' type='text' name='displayName' required onChange={handleChange} value={displayName}  />

                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email} />

                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />

                <FormInput label='Confirm Password' type='password' name='confirmPassword' required onChange={handleChange} value={confirmPassword} />
                
                <Button  type='submit'>Sign-up</Button>

            </form>
           
        </SignUpContainer>
    )
}

export default SignUpForm;

