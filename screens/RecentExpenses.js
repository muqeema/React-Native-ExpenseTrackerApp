import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "./store/expenses-context";
import { getDateMinusDays } from "../components/ExpensesOutput/util/date";
import { fetchExpense } from "../components/ExpensesOutput/util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expenseSCtx = useContext(ExpensesContext)

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try{
                const expenses = await fetchExpense();
                expenseSCtx.setExpenses(expenses);
            } catch(error) {
                setError('Could not fetch expenses');
            }
            setIsFetching(false);
        }

        getExpenses();
    }, [])

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expenseSCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days."/>
}

export default RecentExpenses;