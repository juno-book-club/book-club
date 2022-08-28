import { useState, useEffect } from "react";
import firebase from "../firebase-config";
import { ref, getDatabase, onValue, update } from "firebase/database";
import DisplayBook from "../components/DisplayBook";

function Favourites() {
    const [books, setBooks] = useState([]);
    const userId = localStorage.getItem("userId");
    const [booksRead, setBooksRead] = useState(0);
    //booksRead pseudo code
    //create state of booksRead that loops through the items inside our favourites list. If read=true, add 1 to the state
    //percentage = booksRead/length of booksArray
    //if we remove a book. take 1 away from the local state
    //when we click on the marked as read button, we set a "read" state in display books
    //create a "read" state in display books
    //if the state is true, set a class on the container of the book so we can change the opacity.
    //for the function, if the read state === true then when you click the button you remove the read class, take 1 away from books read and change read to false. opposite if read state === false

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

    return (
        <section className="Favourites">
            <h2>Favourites Page</h2>
            <div className="favouritesContainer">
                <ul className="favouritesList">
                    {" "}
                    {books && <DisplayBook books={books} markRead={true} />}
                    <>
                        <p>
                            Books Read: {booksRead}/{books.length}
                        </p>
                    </>
                </ul>
                <div className="paginationContainer"></div>
            </div>
        </section>
    );
}

export default Favourites;
