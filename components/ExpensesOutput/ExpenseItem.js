import { Pressable, View, StyleSheet, Text } from "react-native";
import { Globalstyle } from "../../constants/styles";
import getFormattedDate from "./util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date}) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpenses', {
            expenseId: id
        });
    }

    return (
        <Pressable 
            onPress={expensePressHandler} 
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: Globalstyle.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: Globalstyle.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1},
        shadowOpacity: 0.4
    },
    textBase: {
        color: Globalstyle.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: Globalstyle.colors.primary500,
        fontWeight: 'bold'
    }
})