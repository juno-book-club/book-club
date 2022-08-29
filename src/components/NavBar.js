import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Favourites from "../pages/Favourites";
import About from "../pages/About";
import { auth } from "../firebase-config";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

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
        <div className="navBarContainer">
            <h1 className="logoTitle">Book Club Reads</h1>
            <nav className="navBar">
                {/* <!-- slide out nav content --> */}
                <button className="hamburgerMenu" onClick={handleToggle}>
                    {navbarOpen ? (
                        <MdClose
                            size={"2em"}
                            color={"#fff"}
                            className="mdClose"
                        />
                    ) : (
                        <FiMenu
                            size={"2em"}
                            color={"#000"}
                            className="fiMenu"
                        />
                    )}
                </button>
                <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                    <li className="menuItem">
                        <Link
                            to="/"
                            className="navLink"
                            onClick={() => closeMenu()}
                        >
                            {" "}
                            Home{" "}
                        </Link>
                    </li>

                    {isAuth && (
                        <li className="menuItem">
                            <Link
                                to="/Favourites"
                                className="navLink"
                                onClick={() => closeMenu()}
                            >
                                {" "}
                                Favourites{" "}
                            </Link>
                        </li>
                    )}

                    <li className="menuItem">
                        <Link
                            to="/About"
                            className="navLink"
                            onClick={() => closeMenu()}
                        >
                            {" "}
                            About{" "}
                        </Link>
                    </li>

                    <li className="menuItem">
                        {isAuth ? (
                            <Link
                                to="/"
                                className="navLink"
                                onClick={() => signUserOut()}
                            >
                                Log out
                            </Link>
                        ) : (
                            <Link
                                to="/Login"
                                className="navLink"
                                onClick={() => closeMenu()}
                            >
                                {" "}
                                Log In{" "}
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
