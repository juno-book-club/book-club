import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebase from "../firebase-config";


function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        console.log(dbRef)
        console.log('awlefji')
    }, [])

    useEffect(() => {
        // before get result from API, setloading will be true
        setLoading(true);
        //on load, take the param from the url and inject it into our api search.
        axios({
            url: "https://www.googleapis.com/books/v1/volumes?",
            method: "GET",
            dataResponse: "json",
            params: {
                key: "AIzaSyAE3WolJuYtvS58lZwY-WvBk-LSl9WLU_Q",
                q: search,
                maxResults: 3,
                projection: "full",
            },
        }).then((res) => {
            // after we got repsonse from API, setLoading will be false
            setLoading(false);
            setBooks(res.data.items);
        }).catch((error) => {
            setError(true);
        });
    }, [search]);

    return (
        <section className="Home">
            {
                // if loading is true, show the loader
                loading ? (
                    <div className="loader"></div>
                ) : (
                    <Form input={input} setInput={setInput} />
                )
            }

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

            {error &&   <Link to="/">
                    <p>
                        What you searched is not exist, click here to go back to
                        Home Page
                    </p>
                </Link>}
        </section>
    );
}

export default SearchPage;
