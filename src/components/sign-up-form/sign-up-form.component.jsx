import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component'
import '../sign-up-form/sign-up-form.styles.scss';
import Button from '../button/button.component';
// import {UserContext} from '../../contexts/user.context';

const defaultFormFields={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm= ()=>{

    const [formFields, setFormFields]= useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}= formFields;
    //console.log(formFields);
    console.log('hit');
    //const {setCurrentUser}= useContext(UserContext);

//we are generating a user document inside of an external service, and because
//we are going to trigger on this onSubmitevent handler , we are going to get an event
//we dont want any default behavior of the form, all that is going to happen on the form we are going to handle
//all i need u to do is tell us when the form has been submitted 

/*const logGoogleUser = async()=>{
    const {user} = await signInWithGooglePopup();
    const userDocRef= await createUserDocumentFromAuth(user)
    //const userAuth= response.uid;*/

//this is an async method because we are generating a user document inside of our extenal service and will trigger with the on submit event handler
//all that will happen with the form, we are going to handle it, all i need u to do is tell us when the form has been hit submit
//then we need to confirm that the password matches and then if we have authenticated that email with user and password
//then we want to create a user doc with the method create user with email ad password

//dont forget to pass displayName when you're actually generate the doc from what we get back from our create method user
    /*const handleSubmit= async(event)=>{
        event.preventDefault();
        if (password ===confirmPassword && auth){
        const userCredential= await createAuthUserWithEmailAndPassword(email, password)
        await createUserDocumentFromAuth(userCredential.user, {displayName})
        };
      

        //const newUser= await signInWithEmailAndPassword();//tuvo que haber recibido el user autenticadp ya en otro lado?


    }*/

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        try {
            const {user}= await createAuthUserWithEmailAndPassword(email, password);
            console.log(user); 
            
            /* So now, when I have a user sign up (a new user), I am also going to have
            this set User in my userContext. */
           // setCurrentUser(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
            
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
        <div>
                 

            <h2>Don't have an account ? </h2> 
            <span>Sign up with your Password and Email</span>
            <form className='sign-up-container' onSubmit={handleSubmit}>
                
                <FormInput label='Display Name' type='text' name='displayName' required onChange={handleChange} value={displayName}  />

                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email} />

                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />

                <FormInput label='Confirm Password' type='password' name='confirmPassword' required onChange={handleChange} value={confirmPassword} />
                <Button buttonType='' type='submit'>Sign-up</Button>
            </form>
           
        </div>
    )
}

export default SignUpForm;

