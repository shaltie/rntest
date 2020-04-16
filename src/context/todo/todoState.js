import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import { ADD_TODO, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS, APPLY_LIKE, APPLY_DISLIKE } from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({children}) => {
    const initialState = {
        todos: []
    }

    const apiUri = 'https://rn-todos.firebaseio.com';//https://inmost-chat.firebaseio.com';

    const {changeScreen} = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)


    const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    const getRandomColor = () => {
        return randomIntFromInterval('000011','999999').toString()
    }

    const addTodo = async title => {
        const response = await fetch('https://rn-todos.firebaseio.com/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, size: 10, bgcolor: getRandomColor()})
        })
        const data = await response.json()
        fetchTodos();
    }

    const removeTodo = async id => {
        const todo = state.todos.find(t => t.id === id)
        showLoader()
        clearError();
        try{
            await fetch(`https://rn-todos.firebaseio.com/todos/${id}.json`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            fetchTodos();
            //dispatch({type: FETCH_TODOS, todos})
        }catch(e){
            showError('Something went wrong...')
            console.log(e)
        }finally{
            hideLoader()
        }
        changeScreen(null)
        dispatch({type: REMOVE_TODO, id})
        /* Alert.alert(
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
                    
                },
              }
            ]
          ) */

        
    }

    const fetchTodos = async () => {
        //return;
        //showLoader()
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

    const applyLikeOrDislike = async (id, isLike) => {
        const todo = state.todos.find(t => t.id === id)
        let size = parseInt(todo.size)
        if(isLike){
            size++
        }else{
            size--
        }
        if(size>=50){
            size = 50
        }
        if(size <= 2){
            removeTodo(id)
        }else{
            clearError();
            try{
                await fetch (`${apiUri}/todos/${id}.json`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({size})
                })
                console.log('done')
                fetchTodos();
                //dispatch({type: FETCH_TODOS, todos})
            }catch(e){
                showError('Something went wrong...')
                console.log(e)
                console.log('not done')
            }
        }
    }

    const applyLike = (id) => {
        console.log(id)
        applyLikeOrDislike(id, true)
    }

    const applyDislike = (id) => {
        applyLikeOrDislike(id, false)
    }

    const updateTodo = async (id, title) => {
        clearError();
        try{
            await fetch (`${apiUri}/todos/${id}.json`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            })
            dispatch({type: UPDATE_TODO, id, title})
        }catch(e){
            showError('Something went wrong...')
            console.log(e)
        }
    }

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
        fetchTodos,
        applyLike,
        applyDislike
    }}>{children}</TodoContext.Provider>
}