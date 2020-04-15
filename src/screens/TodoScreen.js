import React, {useState}from 'react'
import { StyleSheet, View, Button} from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import {THEME} from '../theme'
import {AppCard} from '../ui/AppCard' 
import { EditModal } from '../EditModal'
import {AppTextBold} from '../ui/AppTextBold'
import { AppButton } from '../ui/AppButton'

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
    const [modal, setModal] = useState(false)

    const saveHandler = title => {
        console.log('NEW TTE', title)
        onSave(todo.id, title)
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
                        <AppButton onPress={goBack}>
                            <AntDesign name="back" size={20} />
                        </AppButton>
                        <AppButton color={THEME.DANGER_COLOR} onPress={()=>{onRemove(todo.id)}}>
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