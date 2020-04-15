import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export const AppCard = props => (
    <View style={styles.default}>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    default: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})