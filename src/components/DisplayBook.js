import { Link } from 'react-router-dom';

const DisplayBook = ({book}) => {
    return(
       
          <div className='bookCover'>
            <Link to={`/details/${book.id}`}>
              <img src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w250-h400&source=gbs_api`}/>   
            </Link>
              <div className='ratingFavContainer'>
              <div className='ratingContainer'>
              <h2>{book.averageRating}</h2>
              </div>
              <button>Favs</button>
              </div>
          </div>
    
     
      )
}

export default DisplayBook