import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

// API call to create a budget
const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset(); // Clear form on successful submission
            focusRef.current.focus(); // Reset focus to budget name input
        }
    }, [isSubmitting]);

    const handleSuccess = () => {
        toast.success("Budget created successfully!"); // Notify success
    };

    const handleError = () => {
        toast.error("There was a problem creating your budget."); // Notify error
    };

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.message === "Budget created successfully!") {
                handleSuccess(); // Call success handler if budget created
            } else {
                handleError(); // Call error handler if there was a problem
            }
        }
    }, [fetcher.data]);

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create Budget</h2>
            <fetcher.Form
                method="post"
                action="http://localhost:5000/api/budgets"
                className="grid-sm"
                ref={formRef}
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
                        required // Ensure this field is required
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
