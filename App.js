import { createContext, useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function App() {
    const [input, setInput] = useState("");

    const [noteAll, setNoteAll] = useState("not-connected");
    const printNoteAll = async () => {
        const response = await fetch("http://localhost:8000/get-note-all");
        const obj = await response.json();
        setNoteAll(obj.note_all);
        console.log(noteAll);
    };
    useEffect(() => {
        printNoteAll();
    }, []);

    const createNote = async () => {
        await fetch("http://localhost:8000/post-note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note: input }),
        });
    };
    const handleInputSubmit = async () => {
        if (input === "") return;

        createNote();
        setInput("");
        printNoteAll();
    };

    const Item = ({ note }) => (
        <View>
            <Text>{note}</Text>
        </View>
    );

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
                <FlatList
                    data={noteAll}
                    renderItem={({ item }) => <Item note={item.note} />}
                    keyExtractor={(item) => item.id}
                />
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
