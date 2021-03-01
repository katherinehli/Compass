import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from '../compass/src/pages/HomeScreen'

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    console.warn("hello I am in App.js, about to call appcontainer")
    return <AppContainer />;
  }
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <TouchableOpacity><Text>Hi I am a button</Text></TouchableOpacity>
    //   <StatusBar style="auto" />
    // </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
