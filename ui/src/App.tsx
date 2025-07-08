import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
import { SignUp } from './pages/SignUp/SignUpPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import WhaleInfoPage from './pages/WhaleInfo/WhaleInfoPage'
import { Sightings } from './pages/Sightings/Sightings'


export default function App(): ReactElement {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<UserProfilePage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>            
                <Route path='/info' element={<WhaleInfoPage />}></Route>
                <Route path="/sightings" element={<Sightings/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>   
            </Routes>
        </Router>
    );
}
