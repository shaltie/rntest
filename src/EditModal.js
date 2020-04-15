import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native'
import {THEME} from './theme'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Error', `Minimus length is 3 symbols. Now is only ${title.trim().length}`)
        }else{
            onSave(title)  
        }
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.wrap}>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter text"
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <Button color={THEME.DANGER_COLOR} title="Cancel" onPress={onCancel} />
                    <Button title="Save" onPress={saveHandler} />
                </View>
                
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomWidth: 2,
        width: '80%'    
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})