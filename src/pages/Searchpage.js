import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import { useParams, Link } from "react-router-dom";

import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase-config";
import ReactPaginate from 'react-paginate';


function SearchPage() {
    const { search } = useParams();
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [nextPage, setNextPage] = useState(0);
    const [page, setPage] = useState(1);

    //sets userName and userId on page load
    useEffect(() => {
        setUserName(localStorage.getItem("userName"));
        setUserId(localStorage.getItem("userId"));
    }, [userId, userName]);
    
    const pageResults = 3;
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
                maxResults: pageResults,
                projection: "full",
                printType: "books",
                startIndex: nextPage,
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
    }, [search, nextPage]);

    // on click i am grabbing index of the pagination library data and multiplying it by the page results because the api call doesnt have pages it has a start index
    const handlePageClick = ((data) => {
        //when clicked it grabs the index of what number was clicked
        const pageNumber = data.selected;
        setNextPage(pageNumber * pageResults);
        setPage(pageNumber + 1);
    })

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
                <div>
                    <DisplayBook books={books} />
                    <div className="pagination">
                        <ReactPaginate
                        nextLabel="next"
                        previousLabel="previous"
                        pageCount={10} 
                        onPageChange={handlePageClick}
                        />
                    </div>
                        <p>Page: {page}</p>
                </div>
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
