import './Footer.scss';
import "../../styles/Constants.scss";
import logo from "../../assets/Images/wm-logo-sm.webp";

export function Footer() {
    return (
        <footer className="footer"> 
            <p>
            <img id="footer-whale-museum-logo" src={logo} alt="whale-museum-logo" />          
            &nbsp; &copy; {new Date().getFullYear()} Whale Watching. All rights reserved.</p>      
        </footer>
    );
}