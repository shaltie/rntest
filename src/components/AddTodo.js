import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value)
            setValue('')
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
                placeholder="Enter something"
                />
                <AntDesign.Button name="pluscircleo" onPress={pressHandler}>Add</AntDesign.Button>
        </View>
    )
}

const styles =StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        borderStyle: 'solid',
        borderWidth: 2,
        borderBottomColor: '#faa'
    }
})