import { Link } from "react-router-dom";
import { ref, push, remove, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "../firebase-config";

const DisplayBook = ({ books }) => {
    const [localFavouriteList, setLocalFavouriteList] = useState([]);
    const userId = localStorage.getItem("userId");
    const isAuth = localStorage.getItem("isAuth");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        const bookArray = [];
        let listInDatabase;

        //it looks into the user's favourite list in firebase. If it exists, we push it into our localFavouriteList
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                listInDatabase = snapshot.val();
                for (let key in listInDatabase) {
                    bookArray.push(listInDatabase[key]);
                }
            }
        });
        setLocalFavouriteList(bookArray);
    }, [userId]);

    useEffect(() => {}, []);

    //pushes the bookId into our firebase user's list and it pushes the bookId into our local list to keep both lists in sync
    function addToFavourites(bookId) {
        const favouriteList = localFavouriteList;
        const database = getDatabase(firebase);
        const newRef = ref(database, `/users/${userId}/list`);
        push(newRef, bookId);
        favouriteList.push(bookId);
        setLocalFavouriteList(favouriteList);
        setAdding(true);
    }

    //removes the bookId into our firebase user's list and it removes the bookId into our local list to keep both lists in sync
    function removeFromFavourites(bookId) {
        const database = getDatabase(firebase);
        let listInDatabase;
        const listRef = ref(database, `/users/${userId}/list`);
        get(listRef).then((snapshot) => {
            if (snapshot.exists()) {
                //if our user's favourite list exists, then loop through the list and if we find a bookID that matches
                //the book ID attached to the button, remove that book from our list
                const favouriteList = localFavouriteList;
                listInDatabase = snapshot.val();
                for (let key in listInDatabase) {
                    const bookRef = ref(
                        database,
                        `/users/${userId}/list/${key}`
                    );
                    if (listInDatabase[key] === bookId) {
                        remove(bookRef);
                        const newList = favouriteList.filter(
                            (book) => book !== bookId
                        );
                        setLocalFavouriteList(newList);
                    }
                }
            }
            setAdding(false);
        });
    }
    
    return (
        <>
            {books &&
                books.map((book) => {
                    if (localFavouriteList.includes(book.id)) {
                        return (
                            <li key={book.id}>
                                <div className="bookCover">
                                    <Link to={`/details/${book.id}`}>
                                        <img
                                            src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w250-h400&source=gbs_api`}
                                            alt={`cover of ${book.volumeInfo.title}`}
                                            className="coverImg"
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            {/* if rating is not undefined, display it */}
                                            {
                                              book.volumeInfo.averageRating !== undefined ?
                                              <figcaption>{book.volumeInfo.averageRating}/5</figcaption>
                                              : 
                                              <figcaption>Currently No Rating Available for this book</figcaption>

                                            }
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
                                            className="coverImg"
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            {
                                              book.volumeInfo.averageRating !== undefined ?
                                              <figcaption>{book.volumeInfo.averageRating}/5</figcaption>
                                              : 
                                              <figcaption>Currently No Rating Available for this book</figcaption>

                                            }
                                        </div>
                                        {isAuth && (
                                            <button
                                                onClick={() => {
                                                    addToFavourites(book.id);
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
