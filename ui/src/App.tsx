import './App.scss'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { ReactElement } from 'react';
import { PendingSightingsList } from './components/PendingSightingsList/PendingSightingsList';

export default function App(): ReactElement {
    return (
        <Router>
          <Routes>
           <Route element= {<PrivateRoute/>}>
           <Route path="/Admin" element={<PendingSightingsList />} />
      </Route>
           </Routes>        
        </Router>
    );
} 


