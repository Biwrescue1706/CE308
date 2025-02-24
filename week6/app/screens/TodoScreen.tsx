import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../redux/todoSlice';
import { RootState } from '../redux/store';
import uuid from 'react-native-uuid';

const TodoScreen = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo({ id: uuid.v4() as string, text, completed: false }));
            setText('');}
    };
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>To-Do List</Text>
            <TextInput value={text} onChangeText={setText} placeholder="เพิ่มงาน..."
                style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, }} />
            <Button title="เพิ่มงาน" onPress={handleAddTodo} />
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))} style={{ flex: 1, padding: 10 }}>
                            <Text style={{
                                color: 'black', fontSize: 18, textDecorationLine: item.completed ? 'line-through' : 'none',
                            }}> {item.text}</Text>
                        </TouchableOpacity>
                        <Button title="ลบ" onPress={() => dispatch(removeTodo(item.id))} />
                    </View>
                )}
            />
        </View>
    );
};

export default TodoScreen;
