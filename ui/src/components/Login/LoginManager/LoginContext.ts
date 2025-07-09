import { createContext } from "react";

export interface LoginContextType {
    isLoggedIn: boolean;
    isUserAdmin: boolean;
    logIn: (userAdmin: boolean) => void;
    logOut?: () => void;
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    isUserAdmin: false,
    logIn: () => {},
    logOut: () => {},
});