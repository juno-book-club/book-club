import { useNavigate } from "react-router-dom";

const Form = ({ input, setInput}) => {
  
  const searchChange = (e) => {
    setInput(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('');
    navigate(`/search/${input}`);
  }

  const navigate = useNavigate();
  
    return(
        <div className="form">
          <label htmlFor="search">Search for a book : </label>
            <form onSubmit={handleSubmit} className="searchBarForm">
                <input type="text" htmlFor='search' placeholder="book" onChange={searchChange} value={input} />

                <button type="submit" className="searchBtn">Search</button>
            </form>
        </div>
    )
}

export default Form;