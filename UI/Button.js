import { Pressable, Text, View, StyleSheet } from "react-native";
import { Globalstyle } from "../constants/styles";

function Button({ children, onPress, mode, style }) {
    return <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                    {children}
                </Text>
            </View>
            
        </Pressable>
    </View>
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: Globalstyle.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: Globalstyle.colors.primary200
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: Globalstyle.colors.primary100,
        borderRadius: 4
    }
})