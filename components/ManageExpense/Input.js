import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Globalstyle } from "../../constants/styles";

function Input({label, invalid, style, textInputConfig}) {

    let inputStyles = [styles.input]

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
    },
    label: {
        fontSize: 12,
        color: Globalstyle.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: Globalstyle.colors.primary100,
        color: Globalstyle.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: Globalstyle.colors.error500
    },
    invalidInput: {
        backgroundColor: Globalstyle.colors.error50
    }
})