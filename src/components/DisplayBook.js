import { Link } from "react-router-dom";
import { ref, push, remove, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "../firebase-config";

const DisplayBook = ({ books }) => {
    const userId = localStorage.getItem("userId");
    const isAuth = localStorage.getItem("isAuth");
    const [adding, setAdding] = useState(false);
    const [bookIds, setBookIds] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        const bookArray = [];
        const idArray = [];
        let listInDatabase;

        //it looks into the user's favourite list in firebase. If it exists, we set bookIds to contain each favourited book's id
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                listInDatabase = snapshot.val();
                for (let key in listInDatabase) {
                    bookArray.push(listInDatabase[key]);
                    idArray.push(listInDatabase[key].id);
                }
            }
            setBookIds(idArray);
        });
    }, [userId]);

    //pushes the entire book obj into our user's firebase list
    //we also push the bookId into our bookId list
    function addToFavourites(book) {
        const tempBookIds = [...bookIds];
        const database = getDatabase(firebase);
        const newRef = ref(database, `/users/${userId}/list`);
        push(newRef, book);
        tempBookIds.push(book.id);
        setBookIds(tempBookIds);
        setAdding(true);
        //setting adding state to help re-render the component to reflect whether to display add or remove button
    }

    function removeFromFavourites(bookId) {
        const database = getDatabase(firebase);
        let listInDatabase;
        const listRef = ref(database, `/users/${userId}/list`);
        const tempBookIds = [...bookIds];
        get(listRef).then((snapshot) => {
            if (snapshot.exists()) {
                //if our user's favourite list exists, then loop through the list and if we find a bookID that matches
                //the book ID attached to the button, remove that book from our list
                listInDatabase = snapshot.val();
                for (let key in listInDatabase) {
                    const bookRef = ref(
                        database,
                        `/users/${userId}/list/${key}`
                    );
                    if (listInDatabase[key].id === bookId) {
                        remove(bookRef);
                    }
                }
                //we created a tempBookIds array that's a copy of bookIds state. If the tempBookIds contain the
                //id of the book that's clicked, filter it out and set our bookIds to the newList
                if (tempBookIds.includes(bookId)) {
                    const newIdList = tempBookIds.filter((id) => id !== bookId);
                    setBookIds(newIdList);
                }
            }
            //setAdding to re-render buttons
            setAdding(false);
        });
    }

    return (
        <>
            {books &&
                books.map((book) => {
                    //if the book being render has an id that is contained in our bookIds array, show the remove button
                    //else, show the book with an add button
                    if (bookIds.includes(book.id)) {
                        return (
                            <li key={book.id}>
                                <div className="bookCover">
                                    <Link to={`/details/${book.id}`}>
                                        <img
                                            src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w250-h400&source=gbs_api`}
                                            alt={`cover of ${book.volumeInfo.title}`}
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            <h2>{book.averageRating}</h2>
                                        </div>
                                        {isAuth && (
                                            <button
                                                className="favourited"
                                                onClick={() => {
                                                    removeFromFavourites(
                                                        book.id
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    } else {
                        return (
                            <li key={book.id}>
                                <div className="bookCover">
                                    <Link to={`/details/${book.id}`}>
                                        <img
                                            src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w250-h400&source=gbs_api`}
                                            alt={`cover of ${book.volumeInfo.title}`}
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            <h2>{book.averageRating}</h2>
                                        </div>
                                        {isAuth && (
                                            <button
                                                onClick={() => {
                                                    addToFavourites(book);
                                                }}
                                            >
                                                Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    }
                })}
        </>
    );
};

export default DisplayBook;
