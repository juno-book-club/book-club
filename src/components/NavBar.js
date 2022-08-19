import { useState } from "react";


function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

    return (
      <nav className="navBar">
        {/* <!-- slide out nav content --> */}
        <button className="hamburgerMenu" onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}&#9776;</button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <button className="closeBtn">&times;</button>
                <li className="menuItem">Home</li>
                <li className="menuItem">Favourites</li>
                <li className="menuItem">About</li>
                <li className="menuItem">Log In</li>
            </ul>

            {/* <!-- main navigation --> */}
                {/* <ul className="navLeft">
                    <li className="home">Home</li>
                    <li className="fav">Favourites</li>
                    <li className="about">About</li>
                    <li className="logIn">Log In</li>
                </ul> */}
              
                    <h1>test</h1>
      </nav>
    );
  }
  
  export default NavBar;