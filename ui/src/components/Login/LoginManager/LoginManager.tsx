import React, {JSX, createContext, ReactNode, useState} from "react";


interface LoginContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    logIn: (userAdmin: boolean) => void;
    logOut: () => void;
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    isAdmin: false,
    logIn: () => {},
    logOut: () => {},
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    function logIn(userAdmin: boolean) {
        setLoggedIn(true);
        if (userAdmin == true) {
            setIsAdmin(true);
        }
        
    }

    function logOut() {
        setLoggedIn(false);
        setIsAdmin(false);
    }

    const context = {
        isLoggedIn: loggedIn,
        isAdmin: isAdmin,
        logIn: logIn,
        logOut: logOut,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}