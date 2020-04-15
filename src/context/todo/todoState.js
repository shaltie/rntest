import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import { ADD_TODO, REMOVE_TODO } from '../types'
import { ScreenContext } from '../screen/screenContext'
import {UPDATE_TODO} from '../types'

export const TodoState = ({children}) => {
    const initialState = {
        todos: [{id: '1', title: 'Fuck slim girl'}]
    }

    const {changeScreen} = useContext(ScreenContext)

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = title => dispatch({type: ADD_TODO, title})

    

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
                onPress: () => {
                    changeScreen(null)
                    dispatch({type: REMOVE_TODO, id})
                },
              }
            ]
          )

        
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    return <TodoContext.Provider value={{
        todos: state.todos,
        addTodo,
        updateTodo,
        removeTodo
    }}>{children}</TodoContext.Provider>
}