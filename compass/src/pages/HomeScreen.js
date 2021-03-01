import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {

    render() {
        console.warn("we are in homescreen");

        return(
            <View style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Text>hi</Text>
            </View>
        )
    }
}