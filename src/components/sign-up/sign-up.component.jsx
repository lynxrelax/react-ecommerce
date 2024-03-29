import React from "react";
import './sign-up.styles.scss' ;
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
// import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName:'',
            email: '',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async Event =>{
        Event.preventDefault();

        const {displayName, email, password,confirmPassword} = this.state;

        if(password != confirmPassword) {
            alert("passwords don't match")
            return;
        }

        try{
            // const { user} = await auth.createUserWithEmailAndPassword(auth, email, password);
            // await createUserProfileDocument(user,{displayName});
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })

            this.setState({
            displayName:'',
            email: '',
            password:'',
            confirmPassword:''
            })

        }catch(error){
            console.error(error);

        }
    }


    handleChange = Event =>{
        const {value, name} =Event.target;
        this.setState({[name]:value })
    }

    render(){
        const {displayName, email, password,confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title"> I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text' 
                        name = 'displayName' 
                        value = {displayName}
                        onChange={this.handleChange}
                        label = 'Display Name'
                        required
                        />
                    <FormInput 
                        type='email' 
                        name = 'email' 
                        value = {email}
                        onChange={this.handleChange}
                        label = 'Email'
                        required
                        />
                    <FormInput 
                        type='password' 
                        name = 'password' 
                        value = {password}
                        onChange={this.handleChange}
                        label = 'Password'
                        required
                        />
                    <FormInput 
                        type='password' 
                        name = 'confirmPassword' 
                        value = {confirmPassword}
                        onChange={this.handleChange}
                        label = 'Confirm Password'
                        required
                        />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>

            </div>
        )
    }
}

export default SignUp;


