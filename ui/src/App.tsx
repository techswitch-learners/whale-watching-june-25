
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement, useContext } from 'react';
import { SignUp } from './pages/SignUp/SignUpPage';
import { LoginContext, LoginManager } from './components/Login/LoginManager/LoginContext'
 


export default function App(): ReactElement {
    //const loginContext = useContext(LoginContext);
    // if (!loginContext.isLoggedIn) {
    //     return <Route path='/login' element={<LoginPage/>}/>
    // }

    return (
    <LoginManager>
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>            
            </Routes>
        </Router>
    </LoginManager>
    );
}


