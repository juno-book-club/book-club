import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";

function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
                key: "AIzaSyDC8tENmrYm2oa3JYc8h_KB74KiN7QIbMY",
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
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
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
            {books  ?
                <DisplayBook books={books}/>
                :
                <Link to="/">
                <p>
                    What you searched is not exist, click here to go back to
                    Home Page
                </p>
            </Link>
            
            }

            {error && 
                <>
                <h2>{error}</h2>   
                </>
            }
        </section>
    );
}

export default SearchPage;
