import { JSX, ReactNode } from "react";
import { LoginContext } from "./LoginContext";

interface LoginManagerProps {
    children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    function logIn(userAdmin: boolean) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("isAdmin",JSON.stringify(userAdmin));
    }

    // function logOut() {
    //     sessionStorage.setItem("loggedIn", "false");
    //     sessionStorage.setItem("isAdmin","false");
    // }

    function generateContextObject() {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        const isAdmin = sessionStorage.getItem("isAdmin");

        return {
        isLoggedIn: isLoggedIn ? JSON.parse(isLoggedIn) : false,
        isUserAdmin: isAdmin ? JSON.parse(isAdmin) : false,
        logIn: logIn,
        };
    }

    return (
        <LoginContext.Provider value={generateContextObject()}>
            {props.children}
        </LoginContext.Provider>
    );
}