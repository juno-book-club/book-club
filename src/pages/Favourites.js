import { useState, useEffect } from "react";
import firebase from "../firebase-config";
import { ref, getDatabase, onValue } from "firebase/database";
import DisplayBook from "../components/DisplayBook";

function Favourites() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        const isAuth = localStorage.getItem("isAuth");

        //if user is not authenticated, send them to the login page
        if (!isAuth) {
            window.location.pathname = "/login";
        }

        //it looks into the user's favourite list in firebase. If it exists, we set our books state with the list
        onValue(userRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push(data[key]);
            }
            setBooks(newState);
        });
    }, [userId]);

    return (
        <section className="Favourites">
            <h2>Favourites Page</h2>
            <div className="favouritesContainer">
                <ul className="favouritesList">
                    {" "}
                    {books && <DisplayBook books={books} />}
                </ul>
                <div className="paginationContainer"></div>
            </div>
        </section>
    );
}

export default Favourites;
