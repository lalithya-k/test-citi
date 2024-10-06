import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";
import { TrashIcon } from '@heroicons/react/24/solid';
import ToggleTheme from "./ToggleTheme";
import { toast } from "react-toastify"; // Import toast for notifications

const Nav = ({ userName }) => {
    const handleLogout = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (confirm("Log out and delete all user data?")) {
            try {
                const response = await fetch( `http://localhost:5000/api/auth/logout`, { // Update endpoint to match your backend
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Logout failed");
                }

                const result = await response.json(); // Parse the JSON response
                if (result.message === "Logout successful!") {
                    toast.success("You've successfully logged out!"); // Notify success
                    // Optionally, redirect or perform any additional actions here
                } else {
                    toast.error(result.message || "There was a problem logging out."); // Notify error
                }
            } catch (error) {
                toast.error("There was a problem logging out.");
                console.error(error); // Log error for debugging
            }
        }
    };

    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img src={logomark} alt="" height={30} />
                <p>SpendWise</p>
            </NavLink>
            <ToggleTheme />
            {userName && (
                <Form method="post" action="http://localhost:5000/logout" onSubmit={handleLogout}>
                    <button type="submit" className="btn btn--warning">
                        <span>Log Out</span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            )}
        </nav>
    );
};

export default Nav;
