import React, { useState, JSX } from 'react';
import { useNavigate } from "react-router";
import {login} from "../API_Client";

const Login: React.FC = (): JSX.Element =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email'){
            
            if (!emailRegex.test(value)){
                setError("Please enter a valid email address");
            }
            else {
                setError("");
            }
        setEmail(value);

        }else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailRegex.test(email)){
            setError("Please enter a valid email address");
            return;
        }
        setEmail(email);
        setPassword(password);

        try{
        await login(email, password);
        navigate("/home");
        } catch (err) {
            setError(`Login failed, please check your credentials. ${err}`)
        }
    }

    return (
        <div>
            <form className="login-form">
                <div>
                    <label>Email:</label>
                    
                    <input name="email" type='email' value={email} onChange={handleChange} required />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input name="password" type = 'password' onChange={handleChange} required value = {password} />
                </div>
                <br />
                <button className="submit-button" onClick={handleSubmit} type="submit" >Log In</button>
                <br />
                    {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
};

export default Login;