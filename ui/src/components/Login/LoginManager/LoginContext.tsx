import React, {JSX, createContext, ReactNode, useState} from "react";


interface LoginContextType {
    isLoggedIn: boolean;
    isUserAdmin: boolean;
     logIn: () => void;
    // logOut: () => void;
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    isUserAdmin: false,
     logIn: () => {},
    // logOut: () => {},
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    function logIn() {
        var stringLoggedIn = sessionStorage.getItem("loggedIn");
        var boolLoggedIn = (stringLoggedIn =="true");
        setLoggedIn(boolLoggedIn);

        var stringisAdmin = sessionStorage.getItem("isAdmin");
        var boolisAdmin = (stringisAdmin =="true");
        setIsAdmin(boolisAdmin);
    }


    // function logOut() {
    //     setLoggedIn(false);
    //    // setIsAdmin(false);
    // }

    const context = {
        isLoggedIn: loggedIn,
        isUserAdmin: isAdmin,
         logIn: logIn,
        // logOut: logOut,
    };

    function testFunction() {
        console.log("TEST")
        console.log({ isUserAdmin: context.isUserAdmin })
        console.log({context})
        return (<></>)
    }
      
    return (
        <LoginContext.Provider value={context}>
            {props.children}
            {testFunction()}        
        </LoginContext.Provider>
    );
}