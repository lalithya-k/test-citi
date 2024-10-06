import { redirect } from "react-router-dom";

// libraries
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

// API call to logout the user
export async function logoutAction() {
    try {
        // Perform logout action via API call
        const response = await fetch(`http://localhost:5000/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        // Optionally, you can clear the user session or token if you're using one

        // Delete local user data
        deleteItem({
            key: "userName",
        });
        deleteItem({
            key: "budgets",
        });
        deleteItem({
            key: "expenses",
        });

        toast.success("You've successfully logged out!");
    } catch (e) {
        toast.error("There was a problem logging out.");
        console.error(e); // Log the error for debugging
    }

    // Redirect to home page
    return redirect("/");
}
