import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
    const { bookId } = useParams();
    const [error, setError] = useState("");
    //when error is true, display an error page component
    const [book, setBook] = useState([]);

    useEffect(() => {
        //when page loades, grab the book param from the URL and make an api call
        axios({
            url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8
        `,
            method: "GET",
            dataResponse: "json",
        })
            .then((res) => {
                setBook(res.data.volumeInfo);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return error.length > 0 ? (
        <h2>{error}</h2>
    ) : (
        //buttons will probably need the book.id as an attribute so we can pass it a function to delete the book from the firebase repo
        <section className="details">
            <div className="wrapper">
                <div className="bookDetailContainer">
                    <div className="detailImgContainer">
                        <img
                            src={`https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w250-h400&source=gbs_api`}
                            alt={book.title}
                        />
                    </div>

                    <div className="detailContainer">
                        <h2>{book.title}</h2>
                        {/* if author exist, loop through author array and display each author name */}
                        <h3>
                            Author/Authors:{" "}
                            {book.authors ? (
                                book.authors.map((eachAuthor, index) => (
                                    <p key={index}>{eachAuthor}</p>
                                ))
                            ) : (
                                <p>Unknown Author</p>
                            )}
                        </h3>
                        <div className="descriptionContainer">
                            {book.categories && book.categories[0]}
                            {book.description && (
                                //dangerouslySetInnerHTML cleans out meta-data tags from your text and is a method that should only be used when you 100% trust the source of the information.
                                //behaves like innerHTML where malicious code can be injected within your site.
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: book.description,
                                    }}
                                />
                            )}
                        </div>

                        <button
                            className="backButton"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Details;
