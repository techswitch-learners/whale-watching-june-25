import './App.scss'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSighting } from './pages/WhaleSighting/CreateWhaleSighting'
import { ReactElement } from 'react';
 


export default function App(): ReactElement {
    return (
        <Router>
          <Routes>
           <Route path="/add-new-sighting" element={<CreateWhaleSighting/>}/>      
           </Routes>        
        </Router>
    );

}  
