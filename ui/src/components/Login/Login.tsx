import React, { useState, JSX } from 'react';
import { useNavigate } from "react-router-dom";
import {login} from "../../api/ApiClient";

const Login: React.FC = (): JSX.Element =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [FormError, setFormError] = useState("");
    const [apiError, setapiError] = useState("");
    const emailRegex = /^[^\s]+@[^\s]+.[^\s]{3,}$/;
    const navigate = useNavigate();
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email'){
            
            if (!emailRegex.test(value)){
                setFormError("Please enter a valid email address");
            }
            else {
                setFormError("");
            }
        setEmail(value);

        }else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setapiError("");
        try{
        await login(email, password);        
        navigate("/add-new-sighting");
        } catch (err) {
            setapiError(`Login failed. ${err}`)
        }
    }

    return (
        <div>
            <form className="login-form">
                <div>
                    <label>Email:</label>
                    
                    <input name="email" type='email' value={email} onChange={handleChange} required />
                    {FormError && <p className='error'>{FormError}</p>}
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input name="password" type = 'password' onChange={handleChange} required value = {password} />
                </div>
                <br />
                <button className="submit-button" onClick={handleSubmit} type="submit" >Log In</button>
            </form>
            {apiError && <p className='error'>{apiError}</p>}
        </div>
    );
};

export default Login;