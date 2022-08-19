import axios from "axios";
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

function Details() {

  const { bookId } = useParams();
  const [error, setError] = useState(false);
  const [book, setBook] = useState([]);

  useEffect( () => {
    axios({
        url: `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8`,
        method: 'GET',
        dataResponse: 'json'
    }).then( (res) => {
        setBook(res.data.volumeInfo);
        console.log(res.data.volumeInfo);
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
              <p>{book.description}</p>
              <p>{book.categories.map((genre)=>{return(<p>{genre}</p>)})}</p>
              <p></p>
            </div>

            <div className="buttonContainer">
              <button>Mark as read</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Details;