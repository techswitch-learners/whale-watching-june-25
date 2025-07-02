import {NavLink} from "react-router-dom";
import './Header.scss';
import "../../styles/Constants.scss";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginManager/LoginManager";


export function Header() {
    return (
        <header className="header">           
                <NavLink className="home-link" to="/">Whale Watching</NavLink>           
        </header>
    );
}

export function Navbar() {
    const loginContext = useContext(LoginContext);
    const [showNavbar, setShowNavbar] = useState(false);
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    }
    
     loginContext.isLoggedIn = false;
     loginContext.isAdmin = false;
        if (loginContext.isLoggedIn && !loginContext.isAdmin) {
            return (
            <nav className="navbar">
            <div className="menu-icon" onClick={handleShowNavbar}>
                 {/* ☰ */}
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
                <li><NavLink className="nav-link" to="/" >Home</NavLink></li>
            {/* variable.includes("Admin") && <NavLink className="nav-link" to="/managesightings">Dashboard</NavLink> */}
            <li> <NavLink className="nav-link" to="/add-new-sighting" >Report Sighting</NavLink></li>
           <li> <NavLink className="nav-link" to="/info" >Info</NavLink></li>
            <li><NavLink className="nav-link" to="/">Logout</NavLink></li>
            </ul>
            </div>
        </nav>
            )
        }   

    return (
        <>
       
        <nav className="navbar">
            <div className="menu-icon" onClick={handleShowNavbar}>
                 {/* ☰ */}
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
                <li><NavLink className="nav-link" to="/" >Home</NavLink></li>
            {/* variable.includes("Admin") && <NavLink className="nav-link" to="/managesightings">Dashboard</NavLink> */}
            <li> <NavLink className="nav-link" to="/add-new-sighting" >Report Sighting</NavLink></li>
           <li> <NavLink className="nav-link" to="/info" >Info</NavLink></li>           
           <li> <NavLink className="nav-link" to="/login" >Login</NavLink></li>
           <li> <NavLink className="nav-link" to="/sign-up" >Register</NavLink></li>
            </ul>
            </div>

        </nav>
       
        </>
    )
}