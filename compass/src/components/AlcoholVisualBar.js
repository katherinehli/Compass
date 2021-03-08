import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';

import WineFilled from '../icons/wine-glass-filled.png'
import WineEmpty from '../icons/wine-glass-empty.png'

//takes input of a dictionary of alcohol types and their amounts

export default class AlcoholVisualBar extends React.Component {
    state = {
        beer: this.props.beer,
        wine: this.props.wine,
        whiskey: this.props.whiskey
    }
    render() {
        console.warn("we are in AlcoholVisualBar");
        return(
            <View style={{flexDirection: 'row'}}>
                {/* <Text>hihihi</Text>
                <Text>byebyebye</Text> */}
                <Ionicon name="beer" size={30}/>
                <Ionicon name="beer-outline" size={30}/>
                <FA5Icon name="wine-glass-alt" size={30}/>
                <FA5Icon name="beer" size={30}/>
                <Image style={{ width: 30, height: 30 }} source={require('../icons/wine-glass-filled.png')} />
                <Image style={{ width: 30, height: 30 }} source={require('../icons/wine-glass-empty.png')} />
                <Text>{this.state.beer} {this.state.wine} {this.state.whiskey}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        justifyContent: 'flex-start',
        fontSize: 24,
        marginLeft: 10
    }
})