import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Button } from "react-native-web";

export default function App() {
    const [input, setInput] = useState(null);

    const handleInputSubmit = () => {
        console.log("Input:", input);
        setInput("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                editable
                multiline
                placeholder="Note..."
                placeholderTextColor="pink"
                value={input}
                onChangeText={setInput}
                onEndEditing={handleInputSubmit}
            />
            <Pressable style={styles.button} onPress={handleInputSubmit}>
                <Text style={{ color: "white" }}>Submit</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
    },

    input: {
        width: "25%",
        height: "25%",
        textAlign: "center",
        textAlignVertical: "top",
        paddingVertical: 30,
        paddingHorizontal: 20,
        color: "white",
        backgroundColor: "blue",
    },

    button: {
        padding: 10,
        backgroundColor: "red",
    },
});
