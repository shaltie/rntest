import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {AppText} from './ui/AppText'


export const Todo = ({todo, onLike, onDislike})=> {
    return (
        <TouchableOpacity activeOpacity={0.5} 
            onPress={()=>onLike(todo.id)}
            onLongPress={()=>onDislike(todo.id)}
            >
            <View style={styles.todo} backgroundColor={'#' + todo.bgcolor} padding={todo.size}>
                <AppText size={todo.size} style={styles.title}>{todo.title}</AppText>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        borderRadius: 0
    },
    title: {
        fontFamily: 'roboto-bold',
        color: '#fff'
    }
})