import {NavLink} from "react-router-dom";
import './Header.scss';

export function Header() {
    return (
        <header className="header">
            <NavLink className="home-link" to="/">Whale Watching</NavLink>
        </header>
    );
}

export function Navbar() {
    return (
        <>
        <nav className="navbar">
            <NavLink className="nav-link" to="/">Home</NavLink>
            {/* variable.includes("Admin") && <NavLink className="nav-link" to="/managesightings">Dashboard</NavLink> */}
            <NavLink className="nav-link" to="/add-new-sighting">Report Sighting</NavLink>
            <NavLink className="nav-link" to="/info">Info</NavLink>
            <NavLink className="nav-link" to="/sign-up">Login/Register</NavLink>
            <button className="nav-link">Logout</button>
        </nav>
        </>
    )
}