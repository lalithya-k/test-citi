import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

// Replace the deleteItem and getAllMatchingItems logic with API calls
export async function deleteBudget({ params }) {
    try {
        // Delete budget via API call
        const deleteBudgetResponse = await fetch(`http://localhost:5000/api/budgets/{params_id}`, {
            method: "DELETE",
        });

        if (!deleteBudgetResponse.ok) {
            throw new Error("Failed to delete budget");
        }

        // Fetch all expenses to find associated ones
        const expensesResponse = await fetch(`http://localhost:5000/api/expenses`, {
            method: "GET",
        });

        if (!expensesResponse.ok) {
            throw new Error("Failed to fetch associated expenses");
        }

        const allExpenses = await expensesResponse.json();

        // Filter for associated expenses using budget ID
        const associatedExpenses = allExpenses.filter(expense => expense.budget_id === params.id);

        // Delete associated expenses via API calls
        for (const expense of associatedExpenses) {
            const deleteExpenseResponse = await fetch(`http://localhost:5000/api/expenses/${expense._id}`, {
                method: "DELETE",
            });

            if (!deleteExpenseResponse.ok) {
                throw new Error(`Failed to delete expense with id ${expense._id}`);
            }
        }

        toast.success("Budget and associated expenses deleted successfully!");
    } catch (e) {
        toast.error("There was a problem deleting your budget.");
        console.error(e); // Log the error for debugging
    }

    return redirect("/");
}
