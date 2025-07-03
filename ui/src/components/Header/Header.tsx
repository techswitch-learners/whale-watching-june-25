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
    async function handleShowNavbar() {
        setShowNavbar(!showNavbar);
        await setMenu("active");
        }
    
    const [active, setActive] = useState("active");
      async function setMenu (state: string){        
       await setActive(state); 
       }

            return (
            <nav className="navbar">
            <div className="menu-icon" onClick={handleShowNavbar}>
             </div>
            <div className={`nav-elements  ${showNavbar && active}`}>
            <ul>
            <li><NavLink className="nav-link" to="/" onClick={() => setMenu("inactive")}>Home</NavLink></li>
            {/* variable.includes("Admin") && <NavLink className="nav-link" to="/managesightings">Dashboard</NavLink> */}
            <li> <NavLink className="nav-link" to="/add-new-sighting" onClick={() =>setMenu("inactive")} >Report Sighting</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={() =>setMenu("inactive")} >Info</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={() =>setMenu("inactive")} >Login</NavLink></li>
             <li> <NavLink className="nav-link" to="/info" onClick={() =>setMenu("inactive")} >Register</NavLink></li>
             <li> <NavLink className="nav-link" to="/info" onClick={() =>setMenu("inactive")}>Logout</NavLink></li>
            <li><NavLink className="nav-link" to="/" onClick={() =>setMenu("inactive")}>Logout</NavLink></li>
            </ul>
            </div>
        </nav>
            )
        

}