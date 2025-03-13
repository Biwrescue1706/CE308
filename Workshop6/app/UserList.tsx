import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Post } from "./types/post";
import { Comment } from "./types/comment";

const API_POSTS = "https://jsonplaceholder.typicode.com/posts";
const API_COMMENTS = "https://jsonplaceholder.typicode.com/comments?postId=";

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const postIds = [1, 2, 3];

        Promise.all(postIds.map(id => axios.get<Post>(`${API_POSTS}/${id}`)))
            .then(postResponses => {
                const fetchedPosts = postResponses.map(res => res.data);
                setPosts(fetchedPosts);

                if (fetchedPosts.length === 0) throw new Error("No posts found");

                return Promise.all(
                    fetchedPosts.map(post => axios.get<Comment[]>(`${API_COMMENTS}${post.id}`))
                ).then(commentResponses => {
                    const fetchedComments: { [key: number]: Comment[] } = {};
                    fetchedPosts.forEach((post, index) => {
                        fetchedComments[post.id] = commentResponses[index].data;
                    });
                    setComments(fetchedComments);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error.message);
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                posts.map(post => (
                    <View key={post.id} style={styles.postContainer}>
                        {/* โพสต์ */}
                        <View style={styles.postContent}>
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postBody}>{post.body}</Text>
                        </View>

                        {/* คอมเมนต์ */}
                        <Text style={styles.commentHeader}>ความคิดเห็น:</Text>
                        {comments[post.id]?.map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <View style={styles.row}>
                                    <FontAwesome name="user" size={16} color="black" />
                                    <Text style={styles.commentName}>{comment.name}</Text>
                                </View>
                                <View style={styles.row}>
                                    <FontAwesome name="envelope" size={14} color="black" />
                                    <Text style={styles.commentEmail}>{comment.email}</Text>
                                </View>
                                <Text style={styles.commentBody}>{comment.body}</Text>
                            </View>
                        ))}
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1,backgroundColor: "#fff",padding: 10,},
    postContainer: {marginBottom: 15,padding: 15,borderWidth: 1,borderColor: "#ddd",borderRadius: 10,backgroundColor: "#f9f9f9",
        shadowColor: "#000",shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 4,elevation: 3,},
    postContent: {marginBottom: 10,},
    postTitle: {fontSize: 18,fontWeight: "bold",color: "#007AFF",marginBottom: 5,},
    postBody: {fontSize: 14,color: "#333",},
    commentHeader: {fontSize: 16,fontWeight: "bold",marginTop: 5,marginBottom: 5,},
    commentContainer: {padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, backgroundColor: "#fff", marginBottom: 5, 
        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1,shadowRadius: 3, elevation: 2,},
    row: {flexDirection: "row",alignItems: "center",marginBottom: 2,},
    commentName: { marginLeft: 5, fontWeight: "bold", color: "#333", },
    commentEmail: { marginLeft: 5, color: "#666", },
    commentBody: { color: "#444", },
    error: {color: "red", fontSize: 16, textAlign: "center",},
});

export default PostList;
