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

    function logOut() {
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("isAdmin","false");
    }

    const context = {
       // isLoggedIn: sessionStorage.getItem("loggedIn") === "true",
        isLoggedIn: JSON.parse(sessionStorage.getItem("loggedIn")),
        isUserAdmin: sessionStorage.getItem("isAdmin") === "true",
        logIn: logIn,
    };

    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}