import { View, StyleSheet, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Globalstyle } from "../../constants/styles";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{}</Text>

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses}/>
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: Globalstyle.colors.primary700
    },
    infoText: {
        color: 'white',
        fintSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
})