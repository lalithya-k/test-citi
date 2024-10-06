import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

const ExpenseItem = ({ expense, showBudget }) => {
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetID
    })[0];

    const fetcher = useFetcher();

    // Handle success and error for deletion
    const handleDeleteSuccess = () => {
        toast.success("Expense deleted successfully!");
    };

    const handleDeleteError = () => {
        toast.error("There was a problem deleting the expense.");
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/expenses/${expense.id}`, {
                method: "DELETE", // Use DELETE method for API
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            handleDeleteSuccess(); // Call success handler
        } catch (error) {
            handleDeleteError(); // Call error handler on failure
            console.error(error); // Log error for debugging
        }
    };

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
            {showBudget && (
                <td>
                    <Link
                        to={`/budget/${budget.id}`}
                        style={{
                            "--accent": budget.color,
                        }}
                    >
                        {budget.name}
                    </Link>
                </td>
            )}
            <td>
                <fetcher.Form
                    method="post"
                    action={ `http://localhost:5000/api/expenses/${expense.id}`} // Update to the correct API endpoint for deleting the expense
                    onSubmit={(event) => {
                        event.preventDefault(); // Prevent default form submission
                        if (confirm(`Are you sure you want to delete ${expense.name}?`)) {
                            handleDelete(); // Call delete function on confirmation
                        }
                    }}
                >
                    <input
                        type="hidden"
                        name="_action"
                        value="deleteExpense"
                    />
                    <input
                        type="hidden"
                        name="expenseID"
                        value={expense.id}
                    />
                    <button
                        type="submit"
                        className="btn btn--warning"
                        aria-label={`Delete ${expense.name} expense`}
                    >
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    );
};

export default ExpenseItem;
