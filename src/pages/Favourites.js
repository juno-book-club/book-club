import Form from "../components/Form";


function Favourites() {
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
