import * as React from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";

// libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

export const ThemeContext = React.createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader, // Now fetches data from Flask API
        action: dashboardAction, // Now submits data to Flask API
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader, // Fetch individual budget from Flask API
        action: budgetAction, // Handle budget actions like delete/update using Flask API
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget // Sends delete request to Flask API
          }
        ]
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader, // Fetch expenses from Flask API
        action: expensesAction, // Handle expense actions using Flask API
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction // Now interacts with Flask API for user authentication
      }
    ]
  },
]);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
