import axios from "axios";
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { Link } from "react-router-dom";

function Details() {

  const { bookId } = useParams();
  const [error, setError] = useState(false);
  const [book, setBook] = useState([]);

  useEffect( () => {
    axios({
        url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAE3WolJuYtvS58lZwY-WvBk-LSl9WLU_Q
        `,
        method: 'GET',
        dataResponse: 'json'
    }).then( (res) => {
        setBook(res.data.volumeInfo);
        // console.log(res.data.volumeInfo);
        // console.log(res.data)
    }).catch(() => {
        setError(true);
      })
  },[])

  

    return (
      
      
    <section className="details">
        <div className="wrapper">
       <div className="imgContainer">
             <img src={`https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w250-h400&source=gbs_api`} alt={book.title} />
          </div>
          <div className="detailContainer">
            <h2>{book.title}</h2>
            <div className="descriptionContainer">
              {book.description  && <p
              dangerouslySetInnerHTML={{__html: book.description}}/>}
              {book.categories && book.categories[0]}
              
              
            </div>

            <div className="buttonContainer">
              <button>Mark as read</button>
              <button>Delete</button>
            </div>

            <Link to={`/`}>
               <h2>Back</h2>
           </Link>
          </div> 
        </div>
      </section>
    );
  }
  
  export default Details;