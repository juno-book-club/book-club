import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Favourites from "../pages/Favourites";
import About from "../pages/About";
import { auth } from "../firebase-config";

function NavBar({ isAuth, setIsAuth, signOut }) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/";
        });
    };

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    const closeMenu = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className="navBar">
            <h1 className="logoTitle">Book Club Reads</h1>
            {/* <!-- slide out nav content --> */}
            <button className="hamburgerMenu" onClick={handleToggle}>
                {navbarOpen ? "Close" : "Open"}&#9776;
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <button className="closeBtn">&times;</button>
                {/* <Routes> */}
                <li className="menuItem">
                    <Link to="/" className="navLink">
                        {" "}
                        Home{" "}
                    </Link>
                </li>
                {isAuth && (
                    <li className="menuItem">
                        <Link to="/Favourites" className="navLink">
                            {" "}
                            Favourites{" "}
                        </Link>
                    </li>
                )}

                <li className="menuItem">
                    <Link to="/About" className="navLink">
                        {" "}
                        About{" "}
                    </Link>
                </li>

                <li className="menuItem">
                    {isAuth ? (
                        <button onClick={signUserOut}>Log out</button>
                    ) : (
                        <Link to="/Login" className="navLink">
                            {" "}
                            Log In{" "}
                        </Link>
                    )}
                </li>

                {/* </Routes> */}
            </ul>
        </nav>
    );
}

export default NavBar;
