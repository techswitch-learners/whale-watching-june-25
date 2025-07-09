import {NavLink} from "react-router-dom";
import './Header.scss';
import "../../styles/Constants.scss";
import { useState } from "react";
import logo from "../../assets/Images/wm-logo-sm.webp";


export function Header() {
    return (
        <header className="header">           
                <NavLink className="home-link" to="/"><img id="whale-museum-logo" src={logo} alt="whale-museum-logo" />Whale Watching</NavLink>      
        </header>
    );
}

export function Navbar() {
   
    const [showNavbar, setShowNavbar] = useState(false);

     function handleShowNavbar() {
        setShowNavbar(!showNavbar);
        }

            return (
            <>
            <nav className="navbar">
            <p className="menu-text"><a href="/">Whale Watching</a></p>
            <div className="menu-icon" onClick={handleShowNavbar}>
                {showNavbar
                    ? <span className="icon-x">✕</span>
                    : <span className="icon-bars">≡</span>
                }            </div> 
            <div className={`nav-elements  ${showNavbar ? ' active' : ''}`}>
            <ul>
            <li><NavLink className="nav-link" to="/" onClick={handleShowNavbar}>Home</NavLink></li>
            <li><NavLink className="nav-link" to="/dashboard" onClick={handleShowNavbar}>Dashboard</NavLink></li>
            <li><NavLink className="nav-link" to="/sightings" onClick={handleShowNavbar}>All Sightings</NavLink></li>
            <li> <NavLink className="nav-link" to="/add-new-sighting" onClick={handleShowNavbar} >Report Sighting</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Info</NavLink></li>
            {/* <li> <NavLink className="nav-link" to="/login" onClick={handleShowNavbar} >Login</NavLink></li> */}
             {/* <li> <NavLink className="nav-link" to="/sign-up" onClick={handleShowNavbar} >Register</NavLink></li> */}
             <li> <NavLink className="nav-link" to="/home" onClick={handleShowNavbar}>Logout</NavLink></li>
            </ul>
            <img id="whale-museum-logo-navbar" src={logo} alt="whale-museum-logo"></img>
            </div>
            </nav>
        </>
            )
        

}