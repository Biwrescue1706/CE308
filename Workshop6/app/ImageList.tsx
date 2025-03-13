import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import { ImageData } from "./types/imagelist";

const API_URL = "https://picsum.photos/v2/list?page=1&limit=10";

const ImageList: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<ImageData[]>(API_URL)
      .then(response => setImages(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.download_url }} style={styles.image} />
          <Text style={styles.author}>📷 {item.author}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", fontSize: 18, textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 300, height: 200, borderRadius: 8 },
  author: { marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#333" },
});

export default ImageList;
