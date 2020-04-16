import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button, Alert, Keyboard} from 'react-native'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        }else{
            Alert.alert('Empty value','Understand?', [
                {
                  text: 'Yes'
                },
              ])
        }
    }
    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                onChangeText={text=> setValue(text)}
                value={value}
                maxLength={110}
                onSubmitEditing={pressHandler}
                placeholder="Type something"
                placeholderTextColor={'#0a68da'}
                />
                <Button style={styles.button} onPress={pressHandler} title={'Run'}></Button>
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
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: '#ffa',
        borderBottomColor: '#4cf',
        color: '#000',
        marginLeft: 20,
        marginRight: 5,
        padding: 3
    },
    button: {
        marginRight: 20,
        paddingHorizontal: 40
    }
})