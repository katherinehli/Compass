import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseConfig';
import ProgressCircle from 'react-native-progress-circle'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import moment from 'moment';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import AlcoholVisualBar from '../components/AlcoholVisualBar'

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null,
            chartFormat: "beverage",
            sober_day: null,
            sober_hour: null,
            sober_minute: null,
            pureAlc: [],
            beverage: [],
            timestamps: [],
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
            pureAlc: await this.retrievePureAlc(),
            beverage: await this.retrieveBeverage(),
            timestamps: await this.formatTimestamps(),
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

    async formatTimestamps(){
        console.warn("hi in retrieve pure alc")
        let data = await db.ref(`/log_data_test01`).get();
        // console.warn("data is: ", data)
        data0 = JSON.parse(JSON.stringify(data))
        var dataArray = [];
        for(var o in data0) {
            dataArray.push(data0[o]);
        }

        var timestamps = [];
        for(i = 0; i < dataArray.length; i++) {
            if("min_from_start" in dataArray[i]){
                // console.warn(dataArray[i].min_from_start)
                timestamps.push(dataArray[i].min_from_start)
            }
        }

        var times = [];
        timestamps.forEach(item => {
            let temp = moment().subtract(item, 'minutes').format('h:mm');
            times.push(temp);
            console.warn(temp)
        });
        
        console.warn(times)
        return times
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

        // var timestamps = [];
        var pureAlc = [];
        // for(i = 0; i < dataArray.length; i++) {
        //     if("min_from_start" in dataArray[i]){
        //         // console.warn(dataArray[i].min_from_start)
        //         timestamps.push(dataArray[i].min_from_start)
        //     }
        // }

        for(i = 0; i < dataArray.length; i++) {
            if('accumulated_amount_a' in dataArray[i]){
                // console.warn(dataArray[i].accumulated_amount_a)
                pureAlc.push(dataArray[i].accumulated_amount_a)
            }
        }
        return pureAlc
    }

    async retrieveBeverage() {
        console.warn("hi in retrieve beverage")
        let data = await db.ref(`/log_data_test01`).get();
        // console.warn("data is: ", data)
        data0 = JSON.parse(JSON.stringify(data))
        var dataArray = [];
        for(var o in data0) {
            dataArray.push(data0[o]);
        }

        var beverage = [];
        for(i = 0; i < dataArray.length; i++) {
            if('accumulated_amount_b' in dataArray[i]){
                console.warn(dataArray[i].accumulated_amount_b)
                beverage.push(dataArray[i].accumulated_amount_b)
            }
        }
        return beverage
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
                        {/* <Text>press this to console.warn taro</Text> */}
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View>
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
                        </View>
                        <View>
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
                        </View>
                    </View>
                    
                    <Text>Will sober up at {this.state.sober_hour}:{this.state.sober_minute} ({this.state.sober_day})</Text>
                    {/* <TouchableOpacity onPress={() => this.retrievePureAlc()}>
                        <Text>Press to console.warn pure alc stuff</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.retrieveBeverage()}>
                        <Text>Press to console.warn beverage stuff</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.formatTimestamps()}>
                        <Text>Press to console.warn timestamp stuff</Text>
                    </TouchableOpacity> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={() => {this.setState({chartFormat: "beverage"})}}>
                            <View style={{backgroundColor: 'orange', borderRadius: 10}}>
                                <Text style={{padding: 10}}>Beverage amount</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.setState({chartFormat: "pureAlc"})}}>
                            <View style={{backgroundColor: 'orange', borderRadius: 10}}>
                                <Text style={{padding: 10}}>Alcohol amount</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        (this.state.chartFormat == "pureAlc")?
                        <View>
                            <View style={{ height: 380, width: 380, flexDirection: 'row', alignSelf: 'center' }}>
                                <YAxis
                                    data={this.state.pureAlc}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={10}
                                    formatLabel={(value) => `${value}g`}//change x axis to time stamps maybe :D
                                />
                                <LineChart
                                    style={{ flex: 1, marginLeft: 16 }}
                                    data={this.state.pureAlc}
                                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                >
                                    <Grid />
                                </LineChart>
                            </View>
                            <XAxis
                                style={{ marginHorizontal: -10 }}
                                data={this.state.timestamps}
                                contentInset={{ left: 10, right: 10 }}
                                numberOfTicks={10}
                                formatLabel={(value) => `${value}g`}
                                svg={{ fontSize: 10, fill: 'black' }}
                            />
                        </View>
                        :
                        <View style={{ height: 380, width: 380, flexDirection: 'row', alignSelf: 'center' }}>
                            <YAxis
                                data={this.state.beverage}
                                contentInset={{ top: 20, bottom: 20 }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={(value) => `${value}g`}//change x axis to time stamps maybe :D
                            />
                            <LineChart
                                style={{ flex: 1, marginLeft: 16 }}
                                data={this.state.beverage}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                                contentInset={{ top: 20, bottom: 20 }}
                            >
                                <Grid />
                            </LineChart>
                        </View>
                    }
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