import logo from "./profile/logo.png";
import './css/Header.css'
function Header() {
    return (
        <>
        
      <div className="App">
      <div className="logo">
        
        {/* Use the imported logo variable */}
      <img src={logo} alt="logo" /> 
      <div class="name">
      <h1>Hello, Landicho!</h1>
      </div>
      </div>
    </div>
    </>
    );
  }
  
  export default Header;