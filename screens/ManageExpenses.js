import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../UI/IconButton";
import { Globalstyle } from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "./store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../components/ExpensesOutput/util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpenses({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        expense => expense.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteHandlerFunction() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later!');
            setIsSubmitting(false);
        }
        
    }
    
    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);  
                await updateExpense(editedExpenseId, expenseData);  
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
        
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }
    
    return <View style={styles.container}>
        <ExpenseForm 
            submitButtonLabel={isEditing ? 'Update' : 'Add'} 
            onSubmit={confirmHandler}
            onCancel={cancelHandler}
            defaultValues={selectedExpense}
        />

        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton icon="trash" color={Globalstyle.colors.error500} size={36} onPress={deleteHandlerFunction}/>
            </View>
        )}
    </View>
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Globalstyle.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: Globalstyle.colors.primary200,
        alignItems: 'center'
    }
})