import {NavLink} from "react-router-dom";
import './Header.scss';
import "../../styles/Constants.scss";
import { useContext, useState } from "react";
import logo from "../../assets/Images/wm-logo-sm.webp";
import { LoginContext } from "../Login/LoginManager/LoginContext";


export function Header() {
    return (
        <header className="header">           
                <NavLink className="home-link" to="/"><img id="whale-museum-logo" src={logo} alt="whale-museum-logo" />Whale Watching</NavLink>      
        </header>
    );
}

export function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const loginContext = useContext(LoginContext);
    
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
                {loginContext.isUserAdmin ? 
            (<li><NavLink className="nav-link" to="/admin" onClick={handleShowNavbar}>Admin Dashboard</NavLink></li>): 
            (<></>)}
            <li><NavLink className="nav-link" to="/sightings" onClick={handleShowNavbar}>All Sightings</NavLink></li>
            <li> <NavLink className="nav-link" to="/add-new-sighting" onClick={handleShowNavbar} >Report Sighting</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Info</NavLink></li>
            {loginContext.isLoggedIn ? 
            (<li><NavLink className="nav-link" to="/my-sightings" onClick={handleShowNavbar}>My Sightings</NavLink></li>): 
            (<></>)}
            <li> <NavLink className="nav-link" to="/quiz" onClick={handleShowNavbar} >Whale Quiz</NavLink></li>
            {loginContext.isLoggedIn ? 
            (<li> <NavLink className="nav-link" to="/" onClick={() => {loginContext.logOut?.();handleShowNavbar();}}>Logout</NavLink></li>) :
            (<li> <NavLink className="nav-link" to="/login" onClick={handleShowNavbar} >Login</NavLink></li>)}
            </ul>
            <div id="navbar-footer">
            <img id="whale-museum-logo-navbar" src={logo} alt="whale-museum-logo"></img>
            <p>&nbsp; &copy; {new Date().getFullYear()} Whale Watching. All rights reserved.</p>      
            </div>
            </div>
            </nav>
        </>
            )
        

}

