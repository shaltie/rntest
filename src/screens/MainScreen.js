import React, {useContext, useEffect, useCallback} from 'react'
import { StyleSheet, View, Text, FlatList, Image} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'
import {TodoContext} from '../context/todo/todoContext'
import {ScreenContext} from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'

export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)

    // todo understand this hook useCallback
    const loadTodos = useCallback(async ()=> await fetchTodos(), [fetchTodos])

    useEffect(()=>{
        loadTodos()
    }, [])

    if(loading){
        return <AppLoader />
    }

    if(error){
        return <View>
            <Text style={styles.error}>{error}</Text>
            <AppButton>Try again</AppButton>
        </View>
    }

    let content = (
        <FlatList 
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
            />
    )
    if(todos.length === 0){
        content = <View style={styles.imgWrap}>
            <Image style={styles.image} source={require('../../assets/nastolki.png')} />
        </View>
    }
    return (
        <View >
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    )
}

const styles=StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    error: {
        color: '#ffa000'
    }
})