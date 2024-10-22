import '@fortawesome/fontawesome-free/css/all.min.css';

import './css/Footer.css';

function Footer() {
  return (
    <div className="footer">
    <div className="nav">
      <a href="#">
        <i className="fas fa-home"></i> 
        <span>Home</span>
      </a>
    </div>
    <div className="nav">
      <a href="#">
        <i className="fas fa-shopping-cart"></i> 
        <span>Cart</span>
      </a>
    </div>
    <div className="nav">
      <a href="#">
        <i className="fas fa-user"></i> 
        <span>Profile</span>
      </a>
    </div>
  </div>
  
  );
}

export default Footer;
