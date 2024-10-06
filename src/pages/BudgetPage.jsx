import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetID",
        value: params.id,
    });

    if (!budget) {
        throw new Error("The budget you are trying to find doesn't exist!");
    }

    return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
        try {
            // Create expense
            await createExpense({
                name: values.newExpense,
                amount: parseFloat(values.newExpenseAmount), // Ensure amount is a number
                budgetID: values.newExpenseBudget,
            });

            toast.success(`Expense ${values.newExpense} created!`);
        } catch (e) {
            throw new Error("There was an error in creating your expense.");
        }
    }

    if (_action === "deleteExpense") {
        try {
            // Delete expense
            await deleteItem({
                key: "expenses",
                id: values.expenseID,
            });

            toast.success(`Expense deleted!`);
        } catch (e) {
            throw new Error("There was an error in deleting your expense.");
        }
    }
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();

    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.color,
            }}
        >
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem
                    budget={budget}
                    showDelete={true}
                />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span> Expenses
                    </h2>
                    <Table
                        expenses={expenses}
                        showBudget={true} // Set to true to show budget details in the table
                    />
                </div>
            )}
        </div>
    );
};

export default BudgetPage;
