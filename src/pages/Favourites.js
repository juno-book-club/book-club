import Form from "../components/Form";
import { useState, useEffect } from "react";

//need a local favourite list
//make sure that only logged in users can see this page
//create an empty array inside useEffect call books
//using useEffect, pull their bookIds from firebase
//using a loop, for each item in our booklist, make a separate axios call for each book and push each result to books
//setBooks(books)
//display books that are in their favourites list using our display book component

function Favourites() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    useEffect(() => {
        if (!isAuth) {
            window.location.pathname = "/login";
        }
    }, []);

    return (
        <section className="Favourites">
            <h2>Favourites Page</h2>
            <div className="favouritesContainer">
                <ul className="favouritesList"></ul>
                <div className="paginationContainer"></div>
            </div>
        </section>
    );
} 

export default Favourites;
