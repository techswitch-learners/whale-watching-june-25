import {NavLink, useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();
    

    
     function handleShowNavbar() {
        setShowNavbar(!showNavbar);
        }

            return (
            <>
            <nav className="navbar">
            <p className="menu-text">Whale Watching</p>
            <div className="menu-icon" onClick={handleShowNavbar}>
                {showNavbar
                    ? <span className="icon-x">✕</span>
                    : <span className="icon-bars">≡</span>
                }            </div> 
            <div className={`nav-elements  ${showNavbar ? ' active' : ''}`}>
            <ul>
            <li><NavLink className="nav-link" to="/" onClick={handleShowNavbar}>Home</NavLink></li>
            <li><NavLink className="nav-link" to="/admin" onClick={handleShowNavbar}>Dashboard</NavLink></li>
            <li> <NavLink className="nav-link" to="/add-new-sighting" onClick={handleShowNavbar} >Report Sighting</NavLink></li>
            <li> <NavLink className="nav-link" to="/info" onClick={handleShowNavbar} >Info</NavLink></li>
                {loginContext.isLoggedIn ? (<li> <NavLink className="nav-link" to="/login" onClick={() => {loginContext.logOut?.();handleShowNavbar}}>Logout</NavLink></li>) :(<li> <NavLink className="nav-link" to="/login" onClick={handleShowNavbar} >Login</NavLink></li>)}
            </ul>
            <img id="whale-museum-logo-navbar" src={logo} alt="whale-museum-logo"></img>
            </div>
        </nav>
        </>
            )
        

}

