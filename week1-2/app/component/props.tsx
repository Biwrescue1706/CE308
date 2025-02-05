import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileProps = {
    name: string;
    age: number;
}

const Profile: React.FC<ProfileProps> = ({ name, age }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.text} > Name: {name}</Text >
            <Text style={styles.text} > Age: {age}</Text >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        margin: 16 ,
    },
    text: {
        fontSize: 16,
        marginBottom : 4 ,
        color : '#333',
    },
});

export default Profile;
