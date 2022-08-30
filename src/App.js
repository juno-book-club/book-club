import "./styles/app.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import SearchPage from "./pages/Searchpage";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { signOut } from "firebase/auth";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    return (
        <div className="App">
            <div className="wrapper">
                <header>
                    <NavBar
                        isAuth={isAuth}
                        setIsAuth={setIsAuth}
                        signOut={signOut}
                    />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home isAuth={isAuth} />} />
                        <Route
                            path="/favourites"
                            element={<Favourites isAuth={isAuth} />}
                        />
                        <Route
                            path="/details/:bookId"
                            element={<Details isAuth={isAuth} />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/login"
                            element={<Login setIsAuth={setIsAuth} />}
                        />
                        <Route
                            path="/search/:search"
                            element={<SearchPage setIsAuth={setIsAuth} />}
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;
