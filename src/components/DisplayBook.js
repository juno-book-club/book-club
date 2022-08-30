import { Link } from "react-router-dom";
import {
    ref,
    push,
    remove,
    get,
    getDatabase,
    update,
    onValue,
} from "firebase/database";
import { useEffect, useState } from "react";
import firebase from "../firebase-config";

const DisplayBook = ({ books, markRead }) => {
    const userId = localStorage.getItem("userId");
    const isAuth = localStorage.getItem("isAuth");
    const [adding, setAdding] = useState(false);
    const [bookIds, setBookIds] = useState([]);
    const [favKeyValues, setFavKeyValues] = useState([]);

    //on component load, grab each favorited books' location and ID and set favKeyValue with location:bookId
    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users/${userId}/list`);
        let tempFavKeyValue;
        const bookArray = [];
        const idArray = [];
        let listInDatabase;

        onValue(userRef, (response) => {
            tempFavKeyValue = response.val();
            const tempArray = [];
            for (let key in tempFavKeyValue) {
                tempArray.push({
                    [key]: tempFavKeyValue[key].id,
                });
            }
            setFavKeyValues(tempArray);
        });

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
    //we also push the bookId into our bookIds list
    function addToFavourites(book) {
        const tempBookIds = [...bookIds];
        const database = getDatabase(firebase);
        const newRef = ref(database, `/users/${userId}/list`);
        push(newRef, { ...book, read: false });
        tempBookIds.push(book.id);
        setBookIds(tempBookIds);
        setAdding(true);
        //setting adding state to help re-render the component to reflect whether to display add or remove button
    }

    const updateRead = (bookId) => {
        //loop over the favKeyValues, which contains the path and bookid of favourited books
        //looks into the database for the read status of each book
        //if the bookID of the book that is being clicked on is equal to a bookId found within the favKeyValues list AND it's read status in firebase is set to false, update it to true in firebase
        for (let i = 0; i < favKeyValues.length; i++) {
            const database = getDatabase(firebase);
            for (let key in favKeyValues[i]) {
                let readStatusRef = ref(
                    database,
                    `/users/${userId}/list/${key}/read`
                );

                let bookRef = ref(database, `/users/${userId}/list/${key}`);

                get(readStatusRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const readStatus = snapshot.val();
                        if (!readStatus && bookId === favKeyValues[i][key]) {
                            update(bookRef, { read: true });
                        } else if (
                            readStatus &&
                            bookId === favKeyValues[i][key]
                        ) {
                            update(bookRef, { read: false });
                        }
                    }
                });
            }
        }
    };

    function removeFromFavourites(bookId) {
        const database = getDatabase(firebase);
        let listInDatabase;
        const listRef = ref(database, `/users/${userId}/list`);
        const tempBookIds = [...bookIds];
        get(listRef).then((snapshot) => {
            if (snapshot.exists()) {
                //if our user's favourite list exists, then loop through the list and if we find a bookID that matches the book ID attached to the button, remove that book from our list
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
                                            className={
                                                book.read
                                                    ? "coverActive coverImg"
                                                    : "coverImg"
                                            }
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            {/* if rating is not undefined, display it */}
                                            {book.volumeInfo.averageRating !==
                                            undefined ? (
                                                <figcaption>
                                                    {
                                                        book.volumeInfo
                                                            .averageRating
                                                    }
                                                    /5
                                                </figcaption>
                                            ) : (
                                                <figcaption>
                                                    Currently No Rating
                                                    Available for this book
                                                </figcaption>
                                            )}
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
                                        {markRead && (
                                            <button
                                                onClick={() => {
                                                    updateRead(book.id);
                                                    // setReadStatus();
                                                }}
                                                className={
                                                    book.read
                                                        ? "buttonActive"
                                                        : ""
                                                }
                                            >
                                                mark read
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
                                            {book.volumeInfo.averageRating !==
                                            undefined ? (
                                                <figcaption>
                                                    {
                                                        book.volumeInfo
                                                            .averageRating
                                                    }
                                                    /5
                                                </figcaption>
                                            ) : (
                                                <figcaption>
                                                    Currently No Rating
                                                    Available for this book
                                                </figcaption>
                                            )}
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
