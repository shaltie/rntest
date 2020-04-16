import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {AppTextBold} from './ui/AppTextBold'
import { AddTodo } from './AddTodo'
import {TodoContext} from '../context/todo/todoContext'

export const Navbar = (props) => {
    const {addTodo} = useContext(TodoContext)

    return (
        <View style={styles.navbar}> 
            <AddTodo onSubmit={addTodo} />
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 75,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#faa',
        paddingBottom: 0,
        paddingTop: 0
    },
    text: {
        color: '#fff'
    }
})