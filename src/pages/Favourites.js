import { useEffect } from "react";

function Favourites() {
    const isAuth = localStorage.getItem("isAuth");

    useEffect(() => {
        if (!isAuth) {
            window.location.pathname = "/login";
        }
    }, []);

    return (
        <section className="Favourites">
            <h2>Favourites Page</h2>
            <div className="favouritesContainer">
                <ul className="favouritesList"></ul>
                <div className="paginationContainer"></div>
            </div>
        </section>
    );
}

export default Favourites;
