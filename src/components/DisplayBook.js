import { Link } from "react-router-dom";
import { ref, push, set, remove, onValue, get, getDatabase, update } from "firebase/database"
import { useEffect, useState } from "react";
import firebase from "../firebase-config";


//using useEffect, ref the firebase and pull all favorited books from user's firebase [bookid1, bookid2, bookid3]
//create onValue in useEffect to check for changes in the database
//and update favourited book list 
//save the booklist to state
//on pageload, create a function


const DisplayBook = ({ books }) => {
    const [favouriteList, setFavouriteList] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [localFavouriteList, setLocalFavouriteList] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem("userId")

        const database = getDatabase(firebase);
        const dbRef = ref(database, `/users`);
        const userRef = ref(database, `/users/${userId}/list`);
        const bookArray = []
        let obj;

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                obj = snapshot.val()
                for (let key in obj) {
                    bookArray.push(obj[key]);
                }
            } else {
            }
            setFavouriteList(bookArray)

        });
        setLocalFavouriteList(bookArray)
    }, [])

    function addToFavourites(bookId) {
        const favouriteList = localFavouriteList
        const database = getDatabase(firebase);
        const newRef = ref(database, `/users/${userId}/list`);
        push(newRef, bookId);
        favouriteList.push(bookId)
        setLocalFavouriteList(favouriteList)
        console.log(favouriteList)


    }

    function removeFromFavourites(bookId) {
        const database = getDatabase(firebase);
        let obj;
        const listRef = ref(database, `/users/${userId}/list`);
        get(listRef).then((snapshot) => {
            if (snapshot.exists()) {
                const favouriteList = localFavouriteList
                obj = snapshot.val()
                for (let key in obj) {
                    const bookRef = ref(database, `/users/${userId}/list/${key}`);
                    if (obj[key] === bookId) {
                        remove(bookRef)
                        const newList = favouriteList.filter(book => book === bookId);
                        setLocalFavouriteList(newList)
                    }
                    console.log(localFavouriteList)
                }
            } else {
                console.log('nothing exists')
            }
        });

    }

    // useEffect(() => {
    //     const userId = localStorage.getItem("userId")

    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database, `/users`);
    //     const userRef = ref(database, `/users/${userId}/list`);
    //     const bookArray = []

    // onValue(userRef, (response) => {
    //     console.log('data updated')
    //     let obj;
    //     obj = response.val()
    //     for (let key in obj) {
    //         bookArray.push(obj[key]);
    //     }
    //     setFavouriteList(bookArray)
    //     console.log(bookArray)
    //     console.log(obj)
    // });

    // }, [])


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
                                        />
                                    </Link>
                                    <div className="ratingFavContainer">
                                        <div className="ratingContainer">
                                            <h2>{book.averageRating}</h2>
                                        </div>
                                        <button
                                            className="favourited"
                                            onClick={() => {
                                                removeFromFavourites(book.id);
                                            }}
                                        >
                                            Remove
                                        </button>
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
                                        <button
                                            onClick={() => {
                                                addToFavourites(book.id);
                                            }}
                                        >
                                            Add
                                        </button>
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
