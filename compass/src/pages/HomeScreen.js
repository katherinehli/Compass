import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';

import AlcoholVisualBar from '../components/AlcoholVisualBar'

export default class HomeScreen extends React.Component {
    state = {
        selected: null,
    }

    selectBeverage(beverage) {
        console.warn("selecting", beverage);
        this.setState({selected: beverage})
    }

    render() {
        console.warn("we are in homescreen");
        return(
            <SafeAreaView style={styles.container}>
                <View style={{ alignContent: 'center', justifyContent: 'center', padding: 10}}>
                    <Text style={styles.title}>Dashboard</Text>
                    {/* <AlcoholVisualBar beer={5} wine={3} whiskey={0}/> */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={() => this.selectBeverage("beer")}>
                            <Ionicon name="beer" size={50} color={(this.state.selected == "beer") ? "pink" : "black"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectBeverage("wine")}>
                            <FA5Icon name="wine-glass-alt" size={50} color={(this.state.selected == "wine") ? "pink" : "black"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectBeverage("whiskey")}>
                            <FA5Icon name="glass-whiskey" size={50} color={(this.state.selected == "whiskey") ? "pink" : "black"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        justifyContent: 'flex-start',
        fontSize: 24,
    }
})