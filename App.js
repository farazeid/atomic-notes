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

    const handleInputSubmit = () => {
        console.log("Input:", input);
        setInput("");
    };

    const [todos, setTodos] = useState(0);
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/qwerty");
        const temp = await response.json();
        console.log(temp);
        setTodos(temp.data);
        console.log(temp.data);
        console.log(todos);
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
                <Text>a {todos}</Text>
            </View>
            <TodosContext.Provider value={{ todos, fetchTodos }}>
                {/* <Stack spacing={5}>
                    {todos.map((todo) => (
                        <b>{todo.item}</b>
                    ))}
                </Stack> */}
                b {todos}
            </TodosContext.Provider>
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
