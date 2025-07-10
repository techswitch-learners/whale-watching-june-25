import './App.scss'
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { Header, Navbar } from './components/Header/Header';
import { ReactElement } from 'react';
import {AdminDashboardPage} from './pages/Admin/AdminDashboardPage'
import { SignUp } from './pages/SignUp/SignUpPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import {LoginManager } from './components/Login/LoginManager/LoginManager'
import WhaleInfoPage from './pages/WhaleInfo/WhaleInfoPage'
import { Sightings } from './pages/Sightings/Sightings'
import { Footer } from './components/Footer/Footer';


export default function App(): ReactElement {
  
    return (  
        <LoginManager>    
         <BrowserRouter>
             <Header />
             <Navbar />
                 <Routes>
                     <Route path='/' element={<HomePage/>}/>
                     <Route path='/login' element={<LoginPage/>}/>
                     <Route path='/my-sightings' element={<UserProfilePage/>}/>
                     <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
                     <Route path="/sign-up" element={<SignUp/>}/>            
                     <Route path='/info' element={<WhaleInfoPage />}></Route>
                     <Route path="/sightings" element={<Sightings/>}/>
                     <Route path="/admin" element={<AdminDashboardPage />}/>    
                  </Routes>
                  <Footer />      
         </BrowserRouter>
        </LoginManager>
    );

}