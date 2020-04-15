import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {Navbar} from './src/Navbar'
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    {id: '1', title: 'Fuck slim girl'},
    {id: '2', title: 'Fuck business lady'},
  ])


  if(!isReady){
    return <AppLoading 
      startAsync={loadApplication}
      onError={err=>console.log(err)}
      onFinish={()=>setIsReady(true)}
   />
  }



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
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Remove todo',
      `Are you sure wanna remove "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo=>todo.id !== id))
          },
        }
      ]
    )
  }

  const updateTodo = (id, title) => {
    setTodos(old=>old.map(todo=>{
      if(todo.id===id){
        todo.title = title
      }
      return todo
    }))
  }


  let content = (
    <MainScreen 
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )
  if(todoId){
    const selectedTodo = todos.find(todo=>todo.id === todoId)
    content = (
      <TodoScreen 
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
    />
    )
  }

  

  return (
    <View style={styles.container}>
      <Navbar title="Inmost" />
      <View style={styles.body}>
        {content}
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
