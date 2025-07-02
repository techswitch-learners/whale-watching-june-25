
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react';
import {AdminDashboardPage} from './pages/Admin/AdminDashboardPage'
 



export default function App(): ReactElement {
    return (
        <Router>
          <Routes>
            <Route path="/add-new-sighting" element={<CreateWhaleSightingPage />} />
            <Route path="/admin" element={<AdminDashboardPage />}/>
         </Routes>
        </Router>
    );

}  
