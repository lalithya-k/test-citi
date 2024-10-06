// helper functions
import { Link, useLoaderData } from "react-router-dom";
import { calculateSpentByBudget, createBudget, createExpense, deleteItem, getAllMatchingItems, fetchData} from "../helpers";
import { wait } from "../helpers";
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import Chart from "../components/Chart";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";
import ChatB from "../components/ChatB";

// loader
export async function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = await getAllMatchingItems({ category: "budgets" });
    const expenses = await getAllMatchingItems({ category: "expenses" });
    return {
        userName,
        budgets,
        expenses,
    };
}

// action
export async function dashboardAction({ request }) {
    await wait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        } catch (e) {
            throw new Error("There was a problem in creating your account!");
        }
    }

    if (_action === "createBudget") {
        try {
            // Create budget
            await createBudget({
                name: values.newBudget,
                amount: parseFloat(values.newBudgetAmount), // Ensure amount is a number
            });

            return toast.success("Budget created!");
        } catch (e) {
            throw new Error("There was an error in creating your budget.");
        }
    }

    if (_action === "createExpense") {
        try {
            // Create expense
            await createExpense({
                name: values.newExpense,
                amount: parseFloat(values.newExpenseAmount), // Ensure amount is a number
                budgetID: values.newExpenseBudget,
            });
            return toast.success(`Expense ${values.newExpense} created!`);
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

            return toast.success(`Expense deleted!`);
        } catch (e) {
            throw new Error("There was an error in deleting your expense.");
        }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

    // Calculate total expenses per budget
    const combinedChartData = budgets.map((budget) => {
        // Filter and sum up all expenses related to this budget
        const totalExpensesForBudget = expenses
            .filter((expense) => expense.budgetID === budget.id)
            .reduce((total, expense) => total + parseFloat(expense.amount), 0); // Sum expenses

        return {
            name: budget.name, // Budget name for X-axis
            budgetAmount: parseFloat(budget.amount), // Budgeted amount
            expenseAmount: totalExpensesForBudget, // Total expenses for this budget
            totalSpent: parseFloat(budget.amount) + totalExpensesForBudget, // Total spent (budget + expenses)
            color: budget.color, // Use the budget's color for the chart
        };
    });

    const chartColors = combinedChartData.map((data) => data.color);

    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                    <ChatB />

                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget} />
                                    ))}
                                </div>
                                {expenses && expenses.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent Expenses</h2>
                                        <Table
                                            expenses={expenses.sort((a, b) =>
                                                b.createdAt - a.createdAt
                                            ).slice(0, 8)}
                                        />
                                        {expenses.length > 8 && (
                                            <Link
                                                to="expenses"
                                                className="btn btn--dark"
                                            >
                                                View all expenses
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid-sm">
                                <p>Create a Budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )}
                    </div>
                    <div className="chart-container">
                        <Chart data={combinedChartData} colors={chartColors} />
                        <BarGraph data={combinedChartData} colors={chartColors} />
                    </div>
                    <LineGraph />
                </div>
            ) : (
                <Intro />
            )}
        </>
    );
};

export default Dashboard;
