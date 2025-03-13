import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Index() {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '' });


    useFocusEffect(
        useCallback(() => {

            axios
                .get(`${API_URL}/books`)
                .then((response) => setBooks(response.data))
                .catch((error) => console.error(error));
        }, [])
    );

    const handleDelete = (id: string) => {
        axios
            .delete(`${API_URL}/books/${id}`)
            .then(() => {
                setBooks(books.filter((book) => book.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const handleEdit = (book: any) => {
        setSelectedBook(book);
        setModalVisible(true);
    }



    const closeModal = () => {
        setModalVisible(false);
        setSelectedBook(null);
    }

    const handleUpdate = () => {
        if (selectedBook) {

            const UpdatedBook = {
                title: selectedBook.title,
                author: selectedBook.author,
                description: selectedBook.description,
                price: selectedBook.price,
            };


            axios.put(`${API_URL}/books/${selectedBook.id}`, UpdatedBook)
                .then(() => {
                    closeModal();
                    setBooks((prevBooks) => prevBooks.map((book) => book.id === selectedBook.id ? UpdatedBook : book));
                })
                .catch((error) => {
                    console.error("Error updating book:", error.response?.data || error.message);
                });
        }
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}>
                        <Text>Title: {item.title}</Text>
                        <Text>Author: {item.author}</Text>
                        <Text>Description : {item.description}</Text>
                        <Text>Price: {item.price}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEdit(item.id)}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button title="Go to Profile" onPress={() => router.push("/profile")} />
            <Modal
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Edit Book</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={selectedBook?.title}
                            onChangeText={(text) => setSelectedBook((prev) => { ...prev, title: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Author"
                            value={selectedBook?.author}
                            onChangeText={(text) => setSelectedBook((prev) => { ...prev, author: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={selectedBook?.description}
                            onChangeText={(text) => setSelectedBook((prev) => { ...prev, description: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={selectedBook?.price?.toString()}
                            onChangeText={(text) => setSelectedBook((prev) => { ...prev, price: parseFloat(text) })}
                        />
                        <Button title="Save Changes" onPress={handleUpdate} />
                        <Button title="Cancel" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: '#fff'
    },
    buttonText: {
        color: "#fff",
    },
    editButton: {
        backgroundColor: "#0de136",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    deleteButton: {
        backgroundColor: "#ff4d4d",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
    },
});