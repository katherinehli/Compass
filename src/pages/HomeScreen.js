import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseConfig';
import ProgressCircle from 'react-native-progress-circle'
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import AlcoholVisualBar from '../components/AlcoholVisualBar'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null,
            sober_day: null,
            sober_hour: null,
            sober_minute: null
        }
    }

    async componentDidMount() {
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let day = taro0["-MVOrR5FhWl23Gg0YGTb"]['sober_day']
        let hour = taro0["-MVOrR41SLpwYDWSJoWV"]['sober_hour']
        let minute = taro0["-MVOrR4iG2b2ABITxIOG"]['sober_minute']
        this.setState({
            sober_day: day,
            sober_hour: hour,
            sober_minute: minute
        })
    }

    selectBeverage(beverage) {
        this.setState({selected: beverage})
    }

    async retrieveSoberTime () {
        console.warn("hi in retrieve sober time")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let hour = taro0["-MVOrR41SLpwYDWSJoWV"]['sober_hour']
        let minute = taro0["-MVOrR4iG2b2ABITxIOG"]['sober_minute']
        console.warn(`${hour}:${minute}`)
        return `${hour}:${minute}`
    }

    async retrieveSoberDay () {
        console.warn("hi in retrieve sober day")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let day = taro0["-MVOrR5FhWl23Gg0YGTb"]['sober_day']
        console.warn(`${day}`)
        return day
    }

    render() {
        // console.warn("we are in homescreen");
        let sober_time = JSON.stringify(this.retrieveSoberTime());
        let sober_day = JSON.stringify(this.retrieveSoberDay());
        return(
            <SafeAreaView style={styles.container}>
                <View style={{ alignContent: 'center', justifyContent: 'center', padding: 10}}>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.selectBeverage}>Select a beverage:</Text>
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
                    <TouchableOpacity onPress={() => this.retrieveSoberTime()}>
                        <Text>press this to console.warn taro</Text>
                    </TouchableOpacity>
                    <Text>Liquor consumed</Text>
                    <ProgressCircle
                        percent={30}
                        radius={60}
                        borderWidth={15}
                        color="pink"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{'557/615g'}</Text>
                    </ProgressCircle>

                    <Text>Pace of consumption</Text>
                    <ProgressCircle
                        percent={30}
                        radius={60}
                        borderWidth={15}
                        color="pink"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{'81/75g'}</Text>
                    </ProgressCircle>
                    <Text>Will sober up at {this.state.sober_hour}:{this.state.sober_minute} ({this.state.sober_day})</Text>
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
        marginBottom: 15
    },
    selectBeverage: {
        marginBottom: 15
    }
})