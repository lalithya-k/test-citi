import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

    const handleDeleteSuccess = () => {
        toast.success("Budget deleted successfully!"); // Notify user of successful deletion
    };

    const handleDeleteError = () => {
        toast.error("There was a problem deleting the budget."); // Notify user of deletion failure
    };

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                {spent > amount && (
                    <div className="btn btn--warning">
                        Overspent!
                    </div>
                )}
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method="post"
                        action={ `http://localhost:5000/api/budgets/${id}`} // Update to the correct API endpoint for deleting the budget
                        onSubmit={async (event) => {
                            if (!confirm("Are you sure you want to permanently delete this Budget?")) {
                                event.preventDefault();
                            } else {
                                try {
                                    const response = await fetch( `http://localhost:5000/api/budgets/${id}`, {
                                        method: "DELETE", // Use DELETE method for the API
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });

                                    if (!response.ok) {
                                        throw new Error("Delete failed");
                                    }

                                    handleDeleteSuccess(); // Call the success handler
                                } catch (error) {
                                    handleDeleteError(); // Call the error handler on failure
                                    console.error(error); // Log the error for debugging
                                }
                            }
                        }}
                    >
                        <button
                            type="submit"
                            className="btn"
                        >
                            <span>Delete Budget</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link
                        to={`/budget/${id}`}
                        className="btn"
                    >
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default BudgetItem;
