import {NavLink} from "react-router-dom";
import './Header.scss';
import "../../styles/Constants.scss";
import { useState } from "react";

export function Header() {
    return (
        <header className="header">           
                <NavLink className="home-link" to="/">Whale Watching</NavLink>           
        </header>
    );
}

export function Navbar() {
   
    const [showNavbar, setShowNavbar] = useState(false);
     function handleShowNavbar() {
        setShowNavbar(!showNavbar);
        setMenu("active");
        }

    
    const [active, setActive] = useState("active");
       function setMenu (state: string){        
        setActive(state); 
       }

            return (
            <nav className="navbar">
            <div className="menu-icon" onClick={handleShowNavbar}>
             </div>
            <div className={`nav-elements  ${showNavbar && active}`}>
            <ul>
            <li><NavLink className="nav-link" to="/" onClick={handleShowNavbar}>Home</NavLink></li>
            {/* variable.includes("Admin") && <NavLink className="nav-link" to="/managesightings">Dashboard</NavLink> */}
            <li> <NavLink className="nav-link" to="/add-new-sighting" onClick={handleShowNavbar} >Report Sighting</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Info</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Login</NavLink></li>
             <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Register</NavLink></li>
             <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar}>Logout</NavLink></li>
            <li><NavLink className="nav-link" to="/" onClick={handleShowNavbar}>Logout</NavLink></li>
            </ul>
            </div>
        </nav>
            )
        

}