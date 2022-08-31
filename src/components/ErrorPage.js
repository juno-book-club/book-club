import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <section className="errorPage">
            <h1>404 Page Not Found</h1>
            <p>Oops! Looks like this page went on vacation.</p>
            <Link to="/"> Go Back to Home</Link>
        </section>
    );
}

export default ErrorPage;
