export const wait = () => new Promise(
    res => setTimeout(res,Math.random()*600) 
)


const generateRandomColour = () => {
    const existingBudgetLength = fetchData("budgets") ?.length ?? 0;
    return `${existingBudgetLength*34} 65% 50%`
 }


// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// get all the items from the localStorage
export const getAllMatchingItems = ({category,key,value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}

// delete items from localStorage
export const deleteItem = ({key,id}) => {
    const existingData = fetchData(key);
    if(id)
    {
        const newData = existingData.filter((item) => item.id!==id)
        return localStorage.setItem(key,JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}
// create budget
export const createBudget = ({
    name,
    amount
}) => {
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        color : generateRandomColour()
    }
    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets" , JSON.stringify([...existingBudgets,newItem]))
}

// create expense
export const createExpense = ({
    name,
    amount,
    budgetID
}) => {
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        budgetID : budgetID
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses" , JSON.stringify([...existingExpenses,newItem]))

}
// // delete item
// export const deleteItem = ({key}) => {
//     return localStorage.removeItem(key)
// }

// total budget spent
export const calculateSpentByBudget = (budgetID) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc,expense) => {
        if(expense.budgetID !== budgetID) return acc
        // console.log(expense.budgetID + " " + budgetID)
        return acc+=expense.amount
    }, 0)
    return budgetSpent;
}

// format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style : "currency",
        currency : "INR"
    })
}

//formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style : "percent",
        minimumFractionDigits: 0
    })
}

// format date 
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// toggle dark mode
// export const toggle = () => {
//     return (
//         <h1>Hello</h1>
//     )
// } 