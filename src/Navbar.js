import React from 'react'
import {View, StyleSheet} from 'react-native'
import {AppTextBold} from './ui/AppTextBold'

export const Navbar = (props) => {
    return (
        <View style={styles.navbar}> 
            <AppTextBold style={styles.text}>Inmost</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#faa',
        paddingBottom: 10
    },
    text: {
        color: '#fff'
    }
})