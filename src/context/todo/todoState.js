import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import { ADD_TODO, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({children}) => {
    const initialState = {
        todos: []
    }

    const {changeScreen} = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
        const response = await fetch('https://rn-todos.firebaseio.com/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title})
        })
        const data = await response.json()
        console.log('Data', data)
        dispatch({type: ADD_TODO, title, id: data.name})
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
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
                onPress: async () => {

                    showLoader()
                    clearError();
                    try{
                        await fetch(`https://rn-todos.firebaseio.com/todos./${id}json`, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                        })
                        dispatch({type: FETCH_TODOS, todos})
                    }catch(e){
                        showError('Something went wrong...')
                        console.log(e)
                    }finally{
                        hideLoader()
                    }


                    changeScreen(null)
                    dispatch({type: REMOVE_TODO, id})
                },
              }
            ]
          )

        
    }

    const fetchTodos = async () => {
        showLoader()
        clearError();
        try{
            const response = await fetch('https://rn-todos.firebaseio.com/todos.json', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json();
            console.log('Fetch data', data);
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({type: FETCH_TODOS, todos})
        }catch(e){
            showError('Something went wrong...')
            console.log(e)
        }finally{
            hideLoader()
        }
        
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const hideLoader = () => dispatch({type: HIDE_LOADER})

    const showError = error => dispatch({type: SHOW_ERROR})

    const clearError = () => dispatch({type: CLEAR_ERROR})

    return <TodoContext.Provider value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        updateTodo,
        removeTodo,
        fetchTodos
    }}>{children}</TodoContext.Provider>
}