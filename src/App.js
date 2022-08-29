import "./app.css";
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
                    <div className="wrapper">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home isAuth={isAuth} />}
                            />
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
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;

// pseudo code

// Home page
//     make the api call with axios
//         useEffect
//         get params
//         .then
//             store response with state
//         .catch
//             error handle
//     .map through the state and return the data
//         return
//             image Link to={description}
//             review score
//             button to add to favourites
//                 hold book id
//     have login state
//         update state to true if user is logged in and render favourites button
//     create a form to search for a book
//         update state (e.target.value)
//         handleSubmit
//             clear out input
//             e.prevent default
//             have instructions dissapear and render images (useState)
//             run function to check if books have been added to favourites and if it has disable favourites button on that book
//         Link to={about book page} image
//     add to favourites button
//         update state
//             state === true ? added : button onClick={ () => addFunction() }>Add to favourites
//         on page load check if the book id is already in favourites list and disable it is it is
//         push book id to firebase node of the user thats logged in

// About page
//     home button
//         Link to
//     display
//         image
//         title
//         description
//         genre
//         rating
//         author
//     mark as read button
//         pass state from favs to check if the button is already pressed
//     delete button
//         grab the key from firebase and delete it from favourites

// Favourites page
//     display images of all the books from firebase
//         allow user to Link back to the about book page when the image is clicked
//     pagination if there are too many books displayed on the page

// Bio page
//     have pictures and descriptions of all of us
//         under have our github links
