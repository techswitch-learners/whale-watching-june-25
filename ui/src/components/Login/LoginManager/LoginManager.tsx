import React, {JSX, createContext, ReactNode, useState} from "react";
//import {fetchUserDetails, GetUserInputHashed} from "../../Api/apiClient";


export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    function logIn() {
        setLoggedIn(true);
        
    }

    function logOut() {
        setLoggedIn(false);
    }

    const context = {
        isLoggedIn: loggedIn,
        isAdmin: isAdmin,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}