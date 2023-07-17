import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState()
    
    const onChange = (event) => {
        console.log(event.target.name)
        const {target: {name, value}} = event;
        if(name === 'email'){
            setEmail(value)
        }else if (name === 'password'){
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log({data});
        } catch (error) {
            setError(error.message)
        }   
    }
    const toggleAccount = () => {
        setNewAccount(prev => !prev)
    }
    return (
    <div>
        <form action="" onSubmit={onSubmit}>
            <input onChange={onChange} value={email} name='email' type="text" placeholder='Email' required />
            <input onChange={onChange} value={password} name='password' type="password" placeholder='Password' required />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Guthub</button>
        </div>
    </div>)
}
;

export default Auth;