import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

// Loader function to fetch expenses from the backend
export async function expensesLoader() {
    const expenses = await fetchData("expenses"); // Ensure fetchData is asynchronous
    return {
        expenses
    };
}

// Action function to handle deletion of expenses
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            // Delete expense using the backend
            await deleteItem({
                key: "expenses",
                id: values.expenseID
            });

            toast.success(`Expense deleted!`);
        } catch (e) {
            console.error(e); // Log error details for debugging
            throw new Error("There was an error in deleting your expense.");
        }
    }
}

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div>
            <div className="grid-lg">
                <h1>All Expenses</h1>
                {
                    expenses && expenses.length > 0 ? (
                        <div className="grid-md">
                            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                            <Table expenses={expenses} />
                        </div>
                    ) : (
                        <p>No expenses to show!</p>
                    )
                }
            </div>
        </div>
    );
}

export default ExpensesPage;
