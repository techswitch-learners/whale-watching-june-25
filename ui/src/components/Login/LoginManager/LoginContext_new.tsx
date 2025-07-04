// import React, {JSX, createContext, ReactNode, useState, useEffect} from "react";
// import {useSessionStorage} from 'hooks-ts';

// interface LoginContextType {
//     isLoggedIn: boolean;
//     isUserAdmin: boolean;
//     settingStates: (userAdmin:string, userLoggedIn:string) => void;
//     logIn: () => void;
//     // logOut: () => void;
// }

// export const LoginContext = createContext<LoginContextType>({
//     isLoggedIn: false,
//     isUserAdmin: false,
//     settingStates: () => {},
//      logIn: () => {},
//     // logOut: () => {},
// });

// interface LoginManagerProps {
//     children: ReactNode
// }



// // Custom hook to manage sessionStorage
// // var key: string = "isAdmin";
// // let initialValue: string = "false";

// // export function isUserAdmin(userAdmin:string) {
// //     const [isAdmin, setIsAdmin] = useState(() => {
// //         const storedAdmin = sessionStorage.getItem('isAdmin');
// //         var boolStoredAdmin = (storedAdmin =="true");
// //         return storedAdmin ? boolStoredAdmin : false;
         
// //     });

// //     useEffect(() => {
// //         sessionStorage.setItem('isAdmin', userAdmin);
// //     }, [isAdmin]);
// // }





    

        
// export function LoginManager(props: LoginManagerProps): JSX.Element {
// //     const [loggedIn, setLoggedIn] = useState(false);
// //     const [isAdmin, setIsAdmin] = useState(false);
// //     const [name, setName, removeName] = useSessionStorage<string>(
// //     'name',
// //     'Guest',
// //   );
//             const [isAdmin, setIsAdmin] = useState(() => {
//                 const storedAdmin = sessionStorage.getItem('isAdmin');
//                 var boolStoredAdmin = (storedAdmin =="true");
//                 return storedAdmin ? boolStoredAdmin : false;
                
//             });
//                 const [loggedIn, setLoggedIn] = useState(() => {
//                 const storedLoggedIn = sessionStorage.getItem('isAdmin');
//                 var boolstoredLoggedIn = (storedLoggedIn =="true");
//                 return storedLoggedIn ? boolstoredLoggedIn : false;
//             });


//         function settingStates(userAdmin: string,userLoggedIn: string) {

//             //     const [isAdmin, setIsAdmin] = useState(() => {
//             //     const storedAdmin = sessionStorage.getItem('isAdmin');
//             //     var boolStoredAdmin = (storedAdmin =="true");
//             //     return storedAdmin ? boolStoredAdmin : false;
                
//             // });
//             //     const [loggedIn, setLoggedIn] = useState(() => {
//             //     const storedLoggedIn = sessionStorage.getItem('isAdmin');
//             //     var boolstoredLoggedIn = (storedLoggedIn =="true");
//             //     return storedLoggedIn ? boolstoredLoggedIn : false;
//             // });

//                 useEffect(() => {
//                     sessionStorage.setItem('isAdmin', userAdmin);
//                     sessionStorage.setItem('loggedIn', userLoggedIn);
//                 }, [isAdmin, loggedIn]);
//         }


//         function logIn() {
            
//         }

            
     
     

// // const UseSessionStorage = (key: string, initialValue: string) => {
// //     if (key == "isAdmin"){
// //         const [isAdmin, setIsAdmin] = useState(() => {
// //             const storedValue = sessionStorage.getItem(key);
// //             return storedValue ? JSON.parse(storedValue) : initialValue;
// //         });
// //             useEffect(() => {
// //             sessionStorage.setItem(key, JSON.stringify(isAdmin));
// //         }, [key, isAdmin]);

// //         return [isAdmin, setIsAdmin];
// //     }
    
// //     else if (key =="loggedIn") {
// //             const [loggedIn, setLoggedIn] = useState(() => {
// //             const storedValue = sessionStorage.getItem(key);
// //             return storedValue ? JSON.parse(storedValue) : initialValue;
// //         });
// //             useEffect(() => {
// //             sessionStorage.setItem(key, JSON.stringify(loggedIn));
// //         }, [key, loggedIn]);

// //         return [loggedIn, setLoggedIn];
// //     };


//             // const [sessionStorageValue, setSessionStorageValue] =
//             // UseSessionStorage('isAdmin', 'false');
       
//     // function logIn() {
//     //     var stringLoggedIn = sessionStorage.getItem("loggedIn");
//     //     var boolLoggedIn = (stringLoggedIn =="true");
//     //     setLoggedIn(boolLoggedIn);

//     //     var stringisAdmin = sessionStorage.getItem("isAdmin");
//     //     var boolisAdmin = (stringisAdmin =="true");
//     //     setIsAdmin(boolisAdmin);
//     // }


//     // function logOut() {
//     //     setLoggedIn(false);
//     //    // setIsAdmin(false);
//     // }

//     const context = {
//         isLoggedIn: loggedIn,
//         isUserAdmin: isAdmin,
//         logIn: logIn,
//         // logOut: logOut,
//     };

//     function testFunction() {
//         console.log({ isUserAdmin: context.isUserAdmin })
//         console.log({context})
//         return (<></>)
//     }
      
//     return (
//         <LoginContext.Provider value={context}>
//             {props.children}
//             {testFunction()}        
//         </LoginContext.Provider>
//     );
// }