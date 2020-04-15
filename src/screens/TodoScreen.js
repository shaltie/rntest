import React, {useState, useContext}from 'react'
import { StyleSheet, View, Button} from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import {THEME} from '../theme'
import {AppCard} from '../components/ui/AppCard' 
import { EditModal } from '../components/EditModal'
import {AppTextBold} from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)
    const [modal, setModal] = useState(false)

    const todo = todos.find(t => t.id === todoId)

    const saveHandler = title => {
        console.log('NEW TTE', title)
        updateTodo(todo.id, title)
        setModal(false)
    }

    return <View>
                <EditModal 
                    value={todo.title}
                    visible={modal}
                    onCancel={()=>setModal(false)}
                    onSave={saveHandler}
                />
                <AppCard>
                    <AppTextBold style={styles.text}>{todo.title}</AppTextBold>
                    <AppButton onPress={()=>setModal(true)} >
                        <FontAwesome name="edit" size={20} />
                    </AppButton>
                </AppCard>
                <View style={styles.buttons}>
                    <AppButton onPress={()=>changeScreen(null)}>
                        <AntDesign name="back" size={20} />
                    </AppButton>
                    <AppButton color={THEME.DANGER_COLOR} onPress={()=>{removeTodo(todo.id)}}>
                        <AntDesign name="remove" size={20} />
                    </AppButton>
                </View>
            </View>
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 26
    }
})