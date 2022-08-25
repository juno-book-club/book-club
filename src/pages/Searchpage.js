import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";
import {
    getDatabase,
    ref,
    push,
    update,
    get,
    onValue,
    remove,
    set
} from "firebase/database";
import firebase from "../firebase-config";

function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [allUserKeys, setAllUserKeys] = useState([]);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userObject, setUserObject] = useState(null);

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users`);
        // console.log(allUserKeys);
        onValue(userRef, (response) => {
            const data = response.val();
            let keyArray = [];
            for (let key in data) {
                // keyArray.push(data[key]);

                keyArray.push(data[key].userId);
            }
            setAllUserKeys(keyArray);
        });
    }, []);

    useEffect(() => {
        const database = getDatabase(firebase);
        const userRef = ref(database, `/users`);
        setUserName(localStorage.getItem("userName"));
        setUserId(localStorage.getItem("userId"));
    }, [userId, userName]);

    useEffect(() => {
        // before get result from API, setloading will be true
        setLoading(true);
        //on load, take the param from the url and inject it into our api search.
        axios({
            url: "https://www.googleapis.com/books/v1/volumes?",
            method: "GET",
            dataResponse: "json",
            params: {
                key: "AIzaSyA73wo90bjFjcNUfYMOqKo_qiuKKH2ItL4",
                q: search,
                maxResults: 3,
                projection: "full",
            },
        })
            .then((res) => {
                // after we got repsonse from API, setLoading will be false
                setLoading(false);
                setBooks(res.data.items);
            })
            .catch((error) => {
                setError(true);
            });
    }, [search]);

    // function addToFavourites(bookId) {
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database, "/users");

    //     const newRef = ref(database, `/users/${userId}/list`);

    //     push(newRef, bookId);

    // }

    // function removeFromFavourites(bookId) {
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database, "/users");
    //     let obj;
    //     const listRef = ref(database, `/users/${userId}/list`);
    //     get(listRef).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             obj = snapshot.val()
    //             for (let key in obj) {
    //                 const bookRef = ref(database, `/users/${userId}/list/${key}`);
    //                 if (obj[key] === bookId) {
    //                     remove(bookRef)
    //                 }

    //             }
    //         } else {
    //             console.log('nothing exists')
    //         }
    //     });

    // }

    return (
        <section className="Home">
            {
                // if loading is true, show the loader
                loading ? (
                    <div className="loader"></div>
                ) : (
                    <Form input={input} setInput={setInput} books={books} />
                )
            }
            {/* addToFavourites={addToFavourites} removeFromFavourites={removeFromFavourites} */}
            {books ? (
                <DisplayBook books={books} />
            ) : (
                <Link to="/">
                    <p>
                        What you searched is not exist, click here to go back to
                        Home Page
                    </p>
                </Link>
            )}

            {error && (
                <Link to="/">
                    <p>
                        What you searched is not exist, click here to go back to
                        Home Page
                    </p>
                </Link>
            )}
        </section>
    );
}

export default SearchPage;
