
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import CustomButton from './components/formComponents/customButton/CustomButton'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
import { SignUp } from './pages/SignUp/SignUpPage';
import WhaleInfoPage from './page/WhaleInfo/WhaleInfoPage'


export default function App(): ReactElement {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>            
                <Route path='/info' element={<WhaleInfoPage />}></Route>
            </Routes>
        </Router>
    );
}
