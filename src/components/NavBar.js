import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import bookLogo from "../assets/images/bookLogo.png";

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
            <div className="logo">
                <img src={bookLogo} alt="book club reads logo" className="bookLogo" />
                <h1 className="logoTitle">Book Club Reads</h1>
            </div>
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
                            {" "}Home{" "}
                        </Link>
                    </li>

                    {isAuth && (
                        <li className="menuItem">
                            <Link
                                to="/Favourites"
                                className="navLink"
                                onClick={() => closeMenu()}
                            >
                                {" "}Favourites{" "}
                            </Link>
                        </li>
                    )}

                    <li className="menuItem">
                        <Link
                            to="/About"
                            className="navLink"
                            onClick={() => closeMenu()}
                        >
                            {" "}About{" "}
                        </Link>
                    </li>

                    <li className="menuItem">
                        {isAuth ? (
                            <button onClick={signUserOut} className="logoutBtn">Log out</button>
                        ) : (
                            <Link
                                to="/Login"
                                className="navLink"
                                onClick={() => closeMenu()}
                            >
                                {" "}Log In{" "}
                            </Link>

                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
