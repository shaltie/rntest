import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {Navbar} from './components/Navbar'
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
    <View style={styles.container}> 
      <Navbar title="Inmost" />
      <View style={styles.body}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    body: {
      flex: 1,
      backgroundColor: '#fac',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10
    }
  });