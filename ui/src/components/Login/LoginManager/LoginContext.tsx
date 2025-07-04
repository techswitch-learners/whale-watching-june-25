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
        console.log("in logIn() - user Admin: ", userAdmin);

        sessionStorage.setItem("loggedIn","true")
        console.log("in logIn() - logged in Bool: ", sessionStorage.getItem("loggedIn")=="true");
        if (userAdmin == "true") {
            console.log("in true if for admin")
            sessionStorage.setItem("isAdmin","true")
        }
        else {
            sessionStorage.setItem("isAdmin","false")
        }
        console.log("in logIn() - is Admin Bool: ", sessionStorage.getItem("isAdmin")=="true");
    }


    // function logOut() {
            // sessionStorage.setItem("loggedIn","false");
            // sessionStorage.setItem("loggedIn","false");
    // }

    const context = {
        isLoggedIn: (sessionStorage.getItem("loggedIn")=="true"),
        isUserAdmin: (sessionStorage.getItem("isAdmin")=="true"),
         logIn: logIn,
        // logOut: logOut,
    };

    function testFunction() {
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