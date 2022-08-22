import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Details() {
    const { bookId } = useParams();
    const [error, setError] = useState(false);
    //when error is true, display an error page component
    const [book, setBook] = useState([]);

    useEffect(() => {
        //when page loades, grab the book param from the URL and make an api call
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAE3WolJuYtvS58lZwY-WvBk-LSl9WLU_Q
        `,
            method: "GET",
            dataResponse: "json",
        })
            .then((res) => {
                setBook(res.data.volumeInfo);
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        //buttons will probably need the book.id as an attribute so we can pass it a function to delete the book from the firebase repo
        <section className="details">
            <div className="wrapper">
                <div className="imgContainer">
                    <img
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w250-h400&source=gbs_api`}
                        alt={book.title}
                    />
                </div>
                <div className="detailContainer">
                    <h2>{book.title}</h2>
                    <div className="descriptionContainer">
                        {book.description && (
                            //dangerouslySetInnerHTML cleans out meta-data tags from your text and is a method that should only be used when you 100% trust the source of the information.
                            //behaves like innerHTML where malicious code can be injected within your site.
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: book.description,
                                }}
                            />
                        )}
                        {book.categories && book.categories[0]}
                    </div>

                    <div className="buttonContainer">
                        <button>Mark as read</button>
                        <button>Delete</button>
                    </div>

                    <button
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Details;
