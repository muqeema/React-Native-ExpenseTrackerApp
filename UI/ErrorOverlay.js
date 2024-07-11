import { Text, View, StyleSheet } from "react-native";
import { Globalstyle } from "../constants/styles";

function ErrorOverlay({ message }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: Globalstyle.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})