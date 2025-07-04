import {JSX, createContext, ReactNode} from "react";

interface LoginContextType {
    isLoggedIn: boolean;
    isUserAdmin: boolean;
    logIn: (userAdmin: string) => void;
    // logOut?: () => void;
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
    
    function logIn(userAdmin:string) {

        sessionStorage.setItem("loggedIn","true")
        if (userAdmin == "true") {

            sessionStorage.setItem("isAdmin","true")
        }
        else {
            sessionStorage.setItem("isAdmin","false")
        }
    }


    // function logOut() {
            // sessionStorage.setItem("loggedIn","false");
            // sessionStorage.setItem("isAdmin","false");
    // }

    const context = {
        isLoggedIn: (sessionStorage.getItem("loggedIn")=="true"),
        isUserAdmin: (sessionStorage.getItem("isAdmin")=="true"),
         logIn: logIn,
        // logOut: logOut,
    };

      
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}