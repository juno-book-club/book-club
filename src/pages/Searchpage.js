import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import DisplayBook from '../components/DisplayBook';
import { useParams } from "react-router-dom";

function SearchPage() {
        const { search } = useParams();
        const [books, setBooks] = useState([]);
        const [input, setInput] = useState('');
      
        useEffect(()=>{

            axios({
                url: 'https://www.googleapis.com/books/v1/volumes?',
                method: 'GET',
                dataResponse: 'json',
            params: {
                key: 'AIzaSyAE3WolJuYtvS58lZwY-WvBk-LSl9WLU_Q',
                q: search,
                maxResults: 3,
                projection: "full"
            }
        }).then((res) => {
            setBooks(res.data.items);
        })
        },[search])
    
    return (
            <section className="Home">
                <Form input={input} setInput={setInput} />
                { 
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
            </section>
          );
}
          
  
  export default SearchPage;