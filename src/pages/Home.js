import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect( () => {
    axios({
    url: 'https://www.googleapis.com/books/v1/volumes?',
    method: 'GET',
    dataResponse: 'json',
    params: {
      key: 'AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8',
      q: 'it',
      maxResults: 40,
      projection: "full"
    }
  }).then((res) => {
    setBooks(res.data.items);
  })
},[])

    return (
      <section className="Home">      
          { 
            books && books.map( (book) => {
              const {title, genre, description, averageRating, author} = book.volumeInfo
              return(
                <li key={book.id}>
                  <div className='bookCover'>
                    <Link to={`/details/${book.id}`}>
                      <img src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w250-h400&source=gbs_api`}/>   
                    </Link>
                      <div className='ratingFavContainer'>
                      <div className='ratingContainer'>
                      <h2>{averageRating}</h2>
                      </div>
                      <button>Favs</button>
                      </div>
                  </div>
                </li>
             
              )
            }) 
          }
      </section>
    );
  }
  
  export default Home;