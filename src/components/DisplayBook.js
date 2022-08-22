import { Link } from "react-router-dom";

const DisplayBook = ({ books }) => {
    console.log(books);
    return (
        <>
            {books &&
                books.map((book) => {
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
                                    <button>Favs</button>
                                </div>
                            </div>
                        </li>
                    );
                })}
        </>
    );
};

export default DisplayBook;
