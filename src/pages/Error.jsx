import { Link, useNavigate, useRouteError } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    // Optional: You can log the error to an error tracking service here
    console.error("Error:", error);

    return (
        <div className="error">
            <h1>Uh Oh! Seems like we have a Problem</h1>
            <p>{error.message || "An unexpected error occurred."}</p>
            <div className="flex-md">
                <button
                    className="btn btn--dark"
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                >
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go back</span>
                </button>
                <Link
                    to="/"
                    className="btn btn--dark"
                >
                    <HomeIcon width={20} />
                    <span>Go back to Home</span>
                </Link>
            </div>
        </div>
    );
}

export default Error;
