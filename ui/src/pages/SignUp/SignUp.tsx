import { FormEvent, JSX, useState} from "react";
import "./SignUp.scss";
import { Page } from "../Page/Page";
import { createUser } from "../../api/ApiClient";
import { Navigate } from 'react-router-dom';

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED"

export function SignUpForm(): JSX.Element {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [strength, setStrength] = useState("");
    const strengthColor = { Weak: "red", Medium: "orange", Strong: "green" };
    const [formError, setFormError] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const emailRegex = /^[^\s]+@[^\s]+\.[^\s]{3,}$/;
    const usernameRegex = /^[\w/.]{2,15}$/;

    function evaluatePasswordStrength(password: string) {
        let score = 0;
        if (!password) return '';
        if (password.length >= 6) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
            case 1:
            case 2:
                return "Weak";
            case 3:
            case 4:
                return "Medium";
            case 5:
                return "Strong";
            default:
                return "";
        }
    }

    const handleUserInput = (name: string, value: string) => {
        setFormInput({
            ...formInput,
            [name]: value,
        })
    }
    
    const validateForm = (event: FormEvent) => {
        event.preventDefault();
        setStatus("SUBMITTING");
        const inputError = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }

        if(!formInput.username || !usernameRegex.test(formInput.username)) {
            setFormError({
                ...inputError,
                username: "Usernames must be between 2 and 15 characters and can include full stops and underscores"
            });
            setStatus("READY");
            return;
        }

        if(!formInput.email || !emailRegex.test(formInput.email)) {
            setFormError({
                ...inputError,
                email: "Enter a valid email"
            });
            setStatus("READY");
            return;
        }

        if(!formInput.password && !formInput.confirmPassword) {
            setFormError({
                ...inputError,
                password: "Password cannot be empty",
                confirmPassword: "Please confirm password"
            });
            setStatus("READY");
            return;
        }

        if(formInput.password !== formInput.confirmPassword) {
            setFormError({
                ...inputError,
                confirmPassword: "Passwords must match"
            });
            setStatus("READY");
            return;
        }

        if(strength !== "Strong") {
            setFormError({
                ...inputError,
                password: "Passwords must be at least 6 characters long, have lowercase and uppercase letters, a number and a special character"
            });
            setStatus("READY");
            return;
        }
        
        setFormError(inputError);

        const newUser = {
            username: formInput.username,
            email: formInput.email,
            password: formInput.password
        }
        createUser(newUser)
            .then(() => setStatus("FINISHED"))
            .catch(() => setStatus("ERROR"));
    }

    if (status === "FINISHED" && strength === "Strong") {
        return <Navigate to="/add-new-sighting" replace />;
    }

    return (
            <form onSubmit={validateForm}>
                <label className="label" htmlFor="username">Username</label>
                <input
                    value={formInput.username}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    id="username"
                    name="username"
                    type="text"
                    className="input"
                    placeholder="Enter username"
                />
                <p className="error-message">{formError.username}</p>

                <label className="label" htmlFor="email">Email</label>
                <input
                    value={formInput.email}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="email"
                    id="email"
                    type="email"
                    className="input"
                    placeholder="Enter email"
                    
                />
                <p className="error-message">{formError.email}</p>

                <label className="label" htmlFor="password">Password</label>
                <input
                    value={formInput.password}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                        setStrength(evaluatePasswordStrength(target.value));
                    }}
                    name="password"
                    id="password"
                    type="password"
                    className="input password"
                    placeholder="Enter a secure password"
                />
                    <small>
                        Password strength:{' '}
                            <span style={{
                                fontWeight: 'bold',
                                color: strengthColor[strength as keyof typeof strengthColor],
                            }}>
                                {strength}
                            </span>
                    </small>
                <p className="error-message">{formError.password}</p>

                <label className="label confirm-pw" htmlFor="confirmPassword">Confirm password</label>
                <input
                    value={formInput.confirmPassword}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="Confirm password"
                />
                <p className="error-message">{formError.confirmPassword}</p>

                <button className="submit-button" type="submit" value="Submit" disabled={status === "SUBMITTING"}>Sign Up</button>
                {status === "SUBMITTING" && <p className="info-message">Hold tight your details are surfing the waves!</p>}
                {status === "ERROR" && <p className="error-message">Something went wrong! Please try again.</p>}
            </form>
    );
}

export function SignUp(): JSX.Element {
  return (
    <Page containerClassName="sign-up-form">
      <h1 className="title">Sign Up</h1>
      <SignUpForm />
    </Page>
  );
}