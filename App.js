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

export default function App() {
    const [inputHeight, setInputHeight] = useState("25%");
    const [inputWidth, setInputWidth] = useState("25%");
    // useEffect(() => {
    //     const inputHeight = Math.max(25, input.length / 3).toString() + "%";
    //     setInputHeight(inputHeight);
    // }, [input]);

    const [input, setInput] = useState(null);

    const handleInputSubmit = () => {
        console.log("Input:", input);
        setInput("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { height: inputHeight, width: inputWidth },
                ]}
                editable
                multiline
                placeholder="Note..."
                placeholderTextColor="pink"
                value={input === 0 ? input : null}
                onChangeText={setInput}
                onEndEditing={handleInputSubmit}
            />
            <Pressable
                style={{ padding: 10, backgroundColor: "red" }}
                onPress={handleInputSubmit}
            >
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
        textAlign: "center",
        textAlignVertical: "top",
        paddingVertical: 30,
        paddingHorizontal: 20,
        color: "white",
        backgroundColor: "blue",
    },
});
