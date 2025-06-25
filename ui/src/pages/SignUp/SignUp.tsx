import { FormEvent, JSX, useState} from "react";
import "./SignUp.scss";
import { Page } from "../Page/Page";

export function SignUp(): JSX.Element {
    
    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: ""
    });

    const [formError, setFormError] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleUserInput = (name: string, value: string) => {
        setFormInput({
            ...formInput,
            [name]: value,
        })
    }
    
    const validateForm = (event: FormEvent) => {
        event.preventDefault();

        let inputError = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }


        if(!formInput.username) {
            setFormError({
                ...inputError,
                username: "Enter a username"
            });
            return;
        }

        if(!formInput.email) {
            setFormError({
                ...inputError,
                email: "Enter a valid email"
            });
            return;
        }

        if(!formInput.password && !formInput.confirmPassword) {
            setFormError({
                ...inputError,
                password: "Password cannot be empty",
                confirmPassword: "Please confirm password"
            });
            return;
        }

        if(formInput.password != formInput.confirmPassword) {
            setFormError({
                ...inputError,
                confirmPassword: "Passwords must match"
            });
            return;
        }

        if(!formInput.password) {
            setFormError({
                ...inputError,
                password: "Password cannot be empty",
            });
            return;
        }

        setFormError(inputError);
        setFormInput((prevState) => ({
            ...prevState,
            successMessage: "Success!"
        }));
    }

    return (
        <Page containerClassName="signup">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={validateForm}>
                <label className="label">Username</label>
                <input
                    value={formInput.username}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="username"
                    type="text"
                    className="input"
                    placeholder="Enter username"
                />
                <p className="error-message">{formError.username}</p>

                <label className="label">Email</label>
                <input
                    value={formInput.email}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="email"
                    type="email"
                    className="input"
                    placeholder="Enter email"
                />
                <p className="error-message">{formError.email}</p>


                <label className="label">Password</label>
                <input
                    value={formInput.password}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="password"
                    type="text"
                    className="input"
                    placeholder="Enter a secure password"
                />
                <p className="error-message">{formError.password}</p>

                <label className="label">Confirm password</label>
                <input
                    value={formInput.confirmPassword}
                    onChange={({target}) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name="confirmPassword"
                    type="text"
                    className="input"
                    placeholder="Confirm password"
                />
                <p className="error-message">{formError.confirmPassword}</p>
                <p className="success-message">{formInput.successMessage}</p>

                <button className="submit-button" type="submit" value="Submit">Sign Up</button>
            </form>
        </Page>
    );
}