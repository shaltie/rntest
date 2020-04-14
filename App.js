import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {Navbar} from './src/Navbar'
import {AddTodo} from './src/AddTodo'
import {Todo} from './src/Todo'

export default function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    /* const newTodo = {
      id: Date.now().toString(),
      title: title
    } */

    setTodos(prev=>[
      ...prev, 
      {
        id: Date.now().toString(),
        title
      }
    ])
     
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo=>todo.id !== id))
  }

  

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.body}>
        <Text style={styles.header}>INMOST</Text>
        <Text>Share your moments</Text>
        <AddTodo onSubmit={addTodo} />
        <FlatList 
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} />}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  body: {
    flex: 1,
    backgroundColor: '#fac',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});
