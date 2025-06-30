import {ReactElement } from 'react'
import './App.scss'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


export default function App(): ReactElement {
    return (
        <Router>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/home' element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}
