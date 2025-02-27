import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Post } from "./types/Post";

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

const AxiosExample: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<Post>(API_URL)
            .then(response => {
                console.log("Data received : ", response.data);
                setPost(response.data);
            })
            .catch(error => {
                console.log("Error fetching data : ", error.message);
                setError(error.message);
            })
            .finally(() => setLoading(false))
    }, [])
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) :error?(
                <Text style={styles.error}>{error}</Text>
            ) : (
                <View>
                    <Text style={styles.text}>{post?.title}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container : { flex: 1 , justifyContent : 'center' , alignItems : 'center'},
    text: { fontSize : 18 , fontWeight : 'bold' , color : 'blue'},
    error : { color : 'red' ,fontSize : 16 }
})

export default AxiosExample ;
