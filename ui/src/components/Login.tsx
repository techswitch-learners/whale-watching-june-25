import React, { useState, JSX } from 'react';
import { useNavigate } from "react-router";
import {login} from "../API_Client";

const Login: React.FC = (): JSX.Element =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [UIError, setUIError] = useState("");
    const [BEError, setBEError] = useState("");
    const emailRegex = /^[^\s]+@[^\s]+.[^\s]{3,}$/;
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email'){
            
            if (!emailRegex.test(value)){
                setUIError("Please enter a valid email address");
            }
            else {
                setUIError("");
            }
        setEmail(value);

        }else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBEError("");
        try{
        await login(email, password);
        navigate("/home");
        } catch (err) {
            setBEError(`Login failed. ${err}`)
        }
    }

    return (
        <div>
            <form className="login-form">
                <div>
                    <label>Email:</label>
                    
                    <input name="email" type='email' value={email} onChange={handleChange} required />
                    {UIError && <p className='error'>{UIError}</p>}
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input name="password" type = 'password' onChange={handleChange} required value = {password} />
                </div>
                <br />
                <button className="submit-button" onClick={handleSubmit} type="submit" >Log In</button>
            </form>
            {BEError && <p className='error'>{BEError}</p>}
        </div>
    );
};

export default Login;