import { createContext, useEffect, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const TodosContext = createContext({
    todos: [],
    fetchTodos: () => {},
});

export default function App() {
    const [input, setInput] = useState(null);

    const handleInputSubmit = async () => {
        setInput("");
        fetchTodos();
    };

    const [todos, setTodos] = useState("p");
    const fetchTodos = async () => {
        // console.assert(temp === "qwerty", "fetchTodos failed");
        const response = await fetch("http://127.0.0.1:8000/qwerty");
        const temp = await response.json();
        setTodos(temp);
        console.log(3);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

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
            <View>
                <Text>{todos}</Text>
            </View>
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
