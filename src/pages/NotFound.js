import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry ERROR 404</h2>
            <p>Page not Found</p>
            <Link to="/">Back to the Homepage...</Link>
        </div>
    );
}

export default NotFound;
