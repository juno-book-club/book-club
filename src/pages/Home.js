import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import DisplayBook from "../components/DisplayBook";
import Instructions from "../components/Instructions";

function Home() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [input, setInput] = useState("");

    // const [books, setBooks] = useState([]);
    // const [input, setInput] = useState('');

    // const searchBook = () => {
    //     axios({
    //     url: 'https://www.googleapis.com/books/v1/volumes?',
    //     method: 'GET',
    //     dataResponse: 'json',
    //     params: {
    //       key: 'AIzaSyAE3WolJuYtvS58lZwY-WvBk-LSl9WLU_Q',
    //       // q: 'it',
    //       q: input,
    //       maxResults: 3,
    //       projection: "full"
    //     }
    //   }).then((res) => {
    //     setBooks(res.data.items);
    //   })
    // }

    return (
        // <section className="Home">
        <>
            <Form input={input} setInput={setInput} />
            {/* { 
            books && books.map( (book) => {
              const {title, genre, description, averageRating, author} = book.volumeInfo
              console.log(book)
              return(
                <li key={book.id}>
              <DisplayBook book={book}/>
                </li>
              )
            }) 
          }
      </section> */}
            {/* CHANGE ON MONDAY, because we have a search page now, the instructions should always be on the main page */}
            {!isAuth && <Instructions />}
        </>
    );
}

export default Home;
