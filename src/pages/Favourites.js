import Form from "../components/Form";
import { useState } from "react";

function Favourites({addToFavourites}) {
    const [input, setInput] = useState("");

    return (
        <section className="Favourites">
            <Form input={input} setInput={setInput} />
            <div className="favBooksContainer">
                <div className="indFavBooks">
                    <div className="imgContainer">
                        <img src="" alt="" />
                    </div>
                    <div className="ratingAndLikeContainer">
                        <div className="starContainer">
                            <p>rating</p>
                        </div>
                        <button onClick={()=>{addToFavourites()}}>Like Button</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Favourites;
