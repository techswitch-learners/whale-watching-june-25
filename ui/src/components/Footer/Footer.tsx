import './Footer.scss';
import logo from "../../assets/Images/wm-logo-sm.webp";

export function Footer() {
    return (
        <footer className="footer">        
            <img id="footer-whale-museum-logo" src={logo} alt="The Whale Museum logo with an image of a black whale fin." />          
            <p>&nbsp; &copy; {new Date().getFullYear()} Whale Watching. All rights reserved.</p>      
        </footer>
    );
}