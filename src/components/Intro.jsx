import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { toast } from "react-toastify"; // Import toast for notifications

const Intro = () => {
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries()); // Convert form data to an object

        try {
            const response = await fetch( `http://localhost:5000/api/auth/register`, { // Update endpoint to match your backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Send the form data as JSON
            });

            if (!response.ok) {
                throw new Error("Account creation failed");
            }

            const result = await response.json(); // Parse the JSON response

            if (result.message === "User created successfully!") {
                toast.success("Account created successfully!"); // Notify success
            } else {
                toast.error(result.message || "There was a problem creating the account."); // Notify error
            }
        } catch (error) {
            toast.error("There was a problem creating the account.");
            console.error(error); // Log error for debugging
        }
    };

    return (
        <div className="intro">
            <div>
                <h1>
                    Take control of <span className="accent">Your Money</span>
                </h1>
                <p>Start spending wisely today!</p>
                <Form
                    method="post"
                    onSubmit={handleSubmit} // Add custom submit handler
                >
                    <input
                        type="text"
                        name="userName"
                        required
                        placeholder="What is your name?"
                        aria-label="Your Name"
                        autoComplete="given-name"
                    />
                    <input
                        type="hidden"
                        name="_action"
                        value="newUser"
                    />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Illustration representing financial management" width="600" />
        </div>
    );
};

export default Intro;
