import { Link } from "react-router-dom";
import { ref, push, remove, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "../firebase-config";

const DisplayBook = ({ books }) => {
    const [localFavouriteList, setLocalFavouriteList] = useState([]);
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

        //it looks into the user's favourite list in firebase. If it exists, we push it into our localFavouriteList
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                listInDatabase = snapshot.val();

                for (let key in listInDatabase) {
                    bookArray.push(listInDatabase[key]);
                    idArray.push(listInDatabase[key].id);
                }
            }
            setLocalFavouriteList(bookArray);
            setBookIds(idArray);
        });
    }, [userId]);

    useEffect(() => {}, []);

    //pushes the bookId into our firebase user's list and it pushes the bookId into our local list to keep both lists in sync
    function addToFavourites(book) {
        const tempBookIds = [...bookIds];
        const favouriteList = localFavouriteList;
        const database = getDatabase(firebase);
        const newRef = ref(database, `/users/${userId}/list`);
        push(newRef, book);
        favouriteList.push(book);
        tempBookIds.push(book.id);
        setLocalFavouriteList(favouriteList);
        setBookIds(tempBookIds);
        setAdding(true);
    }

    //removes the bookId into our firebase user's list and it removes the bookId into our local list to keep both lists in sync
    function removeFromFavourites(bookId) {
        const database = getDatabase(firebase);
        let listInDatabase;
        const listRef = ref(database, `/users/${userId}/list`);
        const tempBookIds = [...bookIds];
        console.log("temp Id", tempBookIds);
        get(listRef).then((snapshot) => {
            if (snapshot.exists()) {
                //if our user's favourite list exists, then loop through the list and if we find a bookID that matches
                //the book ID attached to the button, remove that book from our list
                const favouriteList = [...localFavouriteList];
                listInDatabase = snapshot.val();
                for (let key in listInDatabase) {
                    const bookRef = ref(
                        database,
                        `/users/${userId}/list/${key}`
                    );
                    if (listInDatabase[key].id === bookId) {
                        remove(bookRef);
                        const newList = favouriteList.filter(
                            (book) => book.id !== bookId
                        );
                        setLocalFavouriteList(newList);
                    }
                }
                if (tempBookIds.includes(bookId)) {
                    const newList = tempBookIds.filter((id) => id !== bookId);
                    setBookIds(newList);
                }
            }
            console.log(tempBookIds);
            setAdding(false);
            console.log(bookIds);
        });
    }

    return (
        <>
            {books &&
                books.map((book) => {
                    console.log(book.id, bookIds);
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
