import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

// API call to create a budget
const createBudget = async (formData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/budgets`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to create budget");
        }

        return await response.json(); // Assuming the backend sends a JSON response
    } catch (error) {
        throw new Error(error.message);
    }
};

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

    const handleSuccess = () => {
        toast.success("Budget created successfully!");
    };

    const handleError = () => {
        toast.error("There was a problem creating your budget.");
    };

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.message === "Budget created successfully!") {
                handleSuccess();
            } else {
                handleError();
            }
        }
    }, [fetcher.data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);

        // Convert FormData to a plain object
        const budgetData = {
            name: formData.get("newBudget"),
            amount: parseFloat(formData.get("newBudgetAmount")),
            _action: formData.get("_action"),
        };

        try {
            const result = await createBudget(budgetData);
            fetcher.loadData(result); // Load the result to trigger updates
        } catch (error) {
            handleError();
            console.error(error);
        }
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create Budget</h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
                onSubmit={handleSubmit} // Custom submit handler
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="e.g., Food"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                        type="number"
                        step="0.1"
                        inputMode="decimal"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., ₹200"
                        required
                    />
                </div>
                <input
                    type="hidden"
                    name="_action"
                    value="createBudget"
                />
                <button
                    type="submit"
                    className="btn btn--dark"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span>Submitting...</span>
                    ) : (
                        <>
                            <span>Create Budget</span>
                            <CurrencyRupeeIcon width={20} />
                        </>
                    )}
                </button>
            </fetcher.Form>
        </div>
    );
};

export default AddBudgetForm;
