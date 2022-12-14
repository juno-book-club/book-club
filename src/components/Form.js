import { useNavigate } from "react-router-dom";

const Form = ({ input, setInput }) => {
    const searchChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput("");
        navigate(`/search/${input}`);
    };

    const navigate = useNavigate();

    return (
        <div className="form">
            <label htmlFor="search"><h3>Search for a book: </h3></label>
            <form onSubmit={handleSubmit} className="searchBarForm">
                <input
                    type="text"
                    htmlFor="search"
                    placeholder="Try 'To Kill a Mockingbird'"
                    onChange={searchChange}
                    value={input}
                    required
                />

                <button type="submit" className="searchBtn">
                    Search
                </button>
            </form>
        </div>
    );
};

export default Form;
