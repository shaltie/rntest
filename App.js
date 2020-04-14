import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Navbar} from './src/Navbar'

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.body}>
        <Text style={styles.header}>INMOST</Text>
        <Text>Share your moments</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: '#fac',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
