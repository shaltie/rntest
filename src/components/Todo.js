import React from 'react'
import {View, StyleSheet, Vibration, TouchableOpacity} from 'react-native'
import {AppText} from './ui/AppText'


export const Todo = ({todo, onLike, onDislike})=> {

    const onPressHandler = (id) => {
        Vibration.vibrate(10)
        onLike(id)
    }

    const onLongPressHandler = (id) => {
        Vibration.vibrate(100)
        onDislike(id)
    }

    return (
        <TouchableOpacity activeOpacity={0.5} 
            onPress={()=>onPressHandler(todo.id)}
            onLongPress={()=>onLongPressHandler(todo.id)}
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