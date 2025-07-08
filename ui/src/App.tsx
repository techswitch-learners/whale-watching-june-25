
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react'; 
import { SignUp } from './pages/SignUp/SignUpPage';
import { Header, Navbar } from './components/Header/Header';


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

