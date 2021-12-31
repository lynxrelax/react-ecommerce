import React from "react";
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = Event =>{
        Event.preventDefault();

        this.setState({email:'', password:''})
    }

    handleChange = Event =>{
        const {value, name} =Event.target;

        this.setState({[name]:value })
    }
    
    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} label ="email" onChange={this.handleChange} required />
                    <FormInput name="password" type="password" value={this.state.password} label="password" onChange={this.handleChange} required />
                    <div className='buttons'>
                        
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} >Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;