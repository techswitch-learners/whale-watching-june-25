import { JSX, ReactNode } from "react";
import { LoginContext } from "./LoginContext";

interface LoginManagerProps {
    children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    function logIn(userAdmin: string) {
        sessionStorage.setItem("loggedIn", "true");
        if (userAdmin === "true") {
            sessionStorage.setItem("isAdmin", "true");
        } else {
            sessionStorage.setItem("isAdmin", "false");
        }
    }

    const context = {
        isLoggedIn: sessionStorage.getItem("loggedIn") === "true",
        isUserAdmin: sessionStorage.getItem("isAdmin") === "true",
        logIn: logIn,
    };

    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}