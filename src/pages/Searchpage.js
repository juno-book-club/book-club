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
        console.log(allUserKeys);
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
                key: "AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8",
                q: search,
                maxResults: 1,
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

    //function add to favourites
    //check db to see if userID exists
    //if it doesn't, update users object with new object
    //it should contain userName, userId, and an object with the bookID of the book being clicked on

    //if userID exists, we just want to push the bookID into user>list
    // const database = getDatabase(firebase);
    // const dbRef = ref(database, '/users');

    // const users = useDatabaseSnapshot(["users"], dbRef);
    // const snapshot = users.data;
    // console.log(snapshot)

    // if(dataSnapshot.exists()){
    //     console.log('hello');
    // }

    function addToFavourites(bookId) {
        const database = getDatabase(firebase);
        const dbRef = ref(database, "/users");

        const newRef = ref(database, `/users/${userId}/list`);
        get(dbRef)
            .then((snapshot) => {
                let newArray = [];
                let usersArray = snapshot.val();
                for (let key in usersArray) {
                    newArray.push(key);
                }
                setAllUserKeys(newArray);
                setUserObject({
                    //bookID doesn't have to be an array. Push a string
                    //into firebase, when a second string gets pushed in
                    //firebase will turn list into array
                    [userId]: { userName, userId, bookId },
                });
            })
            .then(() => {
                console.log(userObject);
                if (!allUserKeys.includes(userId)) {
                    console.log(
                        `we're updating`,
                        !allUserKeys.includes(userId),
                        { userObject }
                    );
                    update(dbRef, userObject);
                } else {
                    push(newRef, bookId);
                    console.log(`we're pushing`);
                }
            });
    }

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

            {books ? (
                <DisplayBook books={books} addToFavourites={addToFavourites} />
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
