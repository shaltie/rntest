import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button, Alert, Keyboard} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        }else{
            Alert.alert('Empty value')
        }
    }
    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                onChangeText={text=> setValue(text)}
                value={value}
                maxLength={110}
                placeholder="Type something"
                />
                <AntDesign.Button style={styles.button} name="pluscircleo" onPress={pressHandler}>Run</AntDesign.Button>
        </View>
    )
}

const styles =StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 53,
        paddingHorizontal: 5
    },
    input: {
        width: '60%',
        borderStyle: 'solid',
        borderWidth: 0,
        backgroundColor: '#fff',
        borderTopColor: '#ffa',
        borderBottomColor: '#eee',
        color: '#000',
        marginLeft: 20,
        padding: 3
    },
    button: {
        marginRight: 20
    }
})