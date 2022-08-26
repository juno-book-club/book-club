import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
    const { bookId } = useParams();
    const [error, setError] = useState(false);
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
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        //buttons will probably need the book.id as an attribute so we can pass it a function to delete the book from the firebase repo

        <section className="details">
            <div className="wrapper">
                {
                    !error &&
                <div className="detailContainer">
                    <h2>{book.title}</h2>
                    {/* if author exist, loop through author array and display each author name */}
                    {/* {console.log(book.authors)} */}
                    <h2>Author/Authors: {
                    book.authors?
                    book.authors.map((eachAuthor,index)=> <p key={index}>{eachAuthor}</p>)
                    :
                    <p>Unknown Author</p>
                    }
                    </h2>
                    {/* {console.log(book.authors)} */}
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
                </div>
                }
            </div>
        </section>
    );
}

export default Details;
