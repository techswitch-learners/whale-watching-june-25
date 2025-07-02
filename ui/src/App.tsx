import './App.scss'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CreateWhaleSightingPage } from './pages/WhaleSighting/CreateWhaleSightingPage'
import { ReactElement } from 'react'; 
import { Header, Navbar } from './components/Header/Header';


export default function App(): ReactElement {
 
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Navbar/>   
      <Routes>
          <Route path="/reportsighting" element={<CreateWhaleSightingPage/>}/>     
       </Routes>            
    </BrowserRouter>

    </>
  )
}

