import './App.scss'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
import { SignUp } from './pages/SignUp/SignUpPage';
 


export default function App(): ReactElement {
    return (
        <Router>
          <Routes>
           <Route path="/add-new-sighting" element={<CreateWhaleSightingPage/>}/>
           <Route path="/sign-up" element={<SignUp/>}/>      
           </Routes>        
        </Router>
    );

}  
