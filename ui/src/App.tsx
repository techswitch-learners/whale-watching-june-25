import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
import {AdminDashboardPage} from './pages/Admin/AdminDashboardPage'
import { SignUp } from './pages/SignUp/SignUpPage';
import {LoginManager } from './components/Login/LoginManager/LoginManager'
import WhaleInfoPage from './pages/WhaleInfo/WhaleInfoPage'
import { Sightings } from './pages/Sightings/Sightings'


export default function App(): ReactElement {

    return (
    <LoginManager>
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>            
                <Route path='/info' element={<WhaleInfoPage />}></Route>
                <Route path="/sightings" element={<Sightings/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>   
                <Route path="/admin" element={<AdminDashboardPage />}/>
            </Routes>
        </Router>
    </LoginManager>
    );
}


