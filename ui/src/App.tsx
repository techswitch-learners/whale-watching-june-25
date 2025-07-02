
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement, useContext } from 'react'; 
import { SignUp } from './pages/SignUp/SignUpPage';
import { Header, Navbar } from './components/Header/Header';
import { LoginContext, LoginManager } from './components/LoginManager/LoginManager';


export default function App(): ReactElement {

  
    return (      
        <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
           <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>  
           <Route path="/sign-up" element={<SignUp/>}/>    
           </Routes>        
        </BrowserRouter>
    );

}

