import { useState, useEffect } from "react";
import firebase from "../firebase-config";
import { ref, getDatabase, onValue } from "firebase/database";
import DisplayBook from "../components/DisplayBook";

function Favourites() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");
    const [booksRead, setBooksRead] = useState(0);

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        const isAuth = localStorage.getItem("isAuth");

        //if user is not authenticated, send them to the login page
        if (!isAuth) {
            window.location.pathname = "/login";
        }

        //it looks into the user's favourite list in firebase. If it exists, we set our books state with the list
        //also looks in each book object to see if it's been read. If it has, increase booksRead state by 1 for each book read
        onValue(userRef, (response) => {
            const newState = [];
            const data = response.val();
            let numOfBooks = 0;
            for (let key in data) {
                newState.push(data[key]);

                if (data[key].read === true) {
                    numOfBooks = numOfBooks + 1;
                }
            }
            setBooks(newState);
            setBooksRead(numOfBooks);
        });
    }, [userId]);

    function percentage(partialValue, totalValue) {
        return (Math.round(100 * [partialValue]/totalValue))
    }

    return (
        <section className="Favourites">
            <h2>Your Favourites!</h2>
            <p>
                Books Read: {booksRead}/{books.length} {percentage(booksRead, books.length)}%
            </p>
            <div className="favouritesContainer">
                <ul className="favouritesList">
                    {" "}
                    {books && <DisplayBook books={books} markRead={true} />}
                </ul>
                <div className="paginationContainer"></div>
            </div>
        </section>
    );
} 

export default Favourites;
