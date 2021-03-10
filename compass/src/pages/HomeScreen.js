import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseConfig';
import ProgressCircle from 'react-native-progress-circle'
import { LineChart, Grid } from 'react-native-svg-charts'
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import AlcoholVisualBar from '../components/AlcoholVisualBar'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null,
            sober_day: null,
            sober_hour: null,
            sober_minute: null,
            pureAlc: []
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
            sober_minute: minute,
            pureAlc: await this.retrievePureAlc()
        })
        console.warn(this.state)
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

    async retrievePureAlc() {
        console.warn("hi in retrieve pure alc")
        let data = await db.ref(`/log_data_test01`).get();
        // console.warn("data is: ", data)
        data0 = JSON.parse(JSON.stringify(data))
        var dataArray = [];
        for(var o in data0) {
            dataArray.push(data0[o]);
        }


        var timestamps = [];
        var pureAlc = [];
        for(i = 0; i < dataArray.length; i++) {
            if("min_from_start" in dataArray[i]){
                // console.warn(dataArray[i].min_from_start)
                timestamps.push(dataArray[i].min_from_start)
            }
        }

        for(i = 0; i < dataArray.length; i++) {
            if('accumulated_amount_a' in dataArray[i]){
                // console.warn(dataArray[i].accumulated_amount_a)
                pureAlc.push(dataArray[i].accumulated_amount_a)
            }
        }
        return pureAlc
    }

    render() {
        // console.warn("we are in homescreen");
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
                    <TouchableOpacity onPress={() => this.retrievePureAlc()}>
                        <Text>Press to console.warn log_data_test01</Text>
                    </TouchableOpacity>
                    <LineChart
                        style={{ height: 350, width: 350 }}
                        data={this.state.pureAlc}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
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