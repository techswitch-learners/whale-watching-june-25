import { JSX, ReactNode, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";

interface LoginManagerProps {
    children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [, setIsLoggedIn] = useState(false)
    const [, setIsUserAdmin] = useState(false)

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("loggedIn") === "true";
        const admin = sessionStorage.getItem("isAdmin") === "true";
        setIsLoggedIn(loggedIn);
        setIsUserAdmin(admin);
    }, []);
    
    function logIn(userAdmin: boolean) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("isAdmin",JSON.stringify(userAdmin));
        setIsLoggedIn(true);
        setIsUserAdmin(userAdmin);
    }

    function logOut() {
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("isAdmin","false");
        setIsLoggedIn(false);
        setIsUserAdmin(false);
        
    }

    function generateContextObject() {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        const isAdmin = sessionStorage.getItem("isAdmin");

        return {
        isLoggedIn: isLoggedIn ? JSON.parse(isLoggedIn) : false,
        isUserAdmin: isAdmin ? JSON.parse(isAdmin) : false,
        logIn: logIn,
        logOut: logOut,
        };
    }

    return (
        <LoginContext.Provider value={generateContextObject()}>
            {props.children}
        </LoginContext.Provider>
    );
}