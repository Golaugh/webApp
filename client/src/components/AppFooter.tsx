import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return (
    <footer className="footer">
        <section className="links">
            <Link to="/facebook"><i className="fa-brands fa-facebook"></i></Link>
            <Link to="/instagram"><i className="fa-brands fa-instagram"></i></Link>
            <Link to="/twitter"><i className="fa-brands fa-twitter"></i></Link>
        </section>
        <div className="footer-info">
            <span className="contact"><Link to="/contact-us"><u className="contact-us">contact us</u>
            </Link> & <Link to="/directions"><u className="directions">directions</u></Link></span>
            <span className="copyright">copyright© Conlin's Book inc. All rights reserved</span>
        </div>
    </footer>
)
}

export default AppFooter;
