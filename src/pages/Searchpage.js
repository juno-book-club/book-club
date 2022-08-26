import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase-config";

function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    //sets userName and userId on page load
    useEffect(() => {
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
                printType: "books",
            },
        })
            .then((res) => {
                // after we got repsonse from API, setLoading will be false
                setLoading(false);
                setBooks(res.data.items);
                console.log(res.data);
            })
            .catch((error) => {
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
                    <Form input={input} setInput={setInput} books={books} />
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
