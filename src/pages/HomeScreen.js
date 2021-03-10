import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseConfig';
import ProgressCircle from 'react-native-progress-circle'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import moment, { max } from 'moment';
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
            current_amount: null,
            current_pace: null,
            limit_amount: null,
            max_pace: null,
            amountPercent: null,
            pacePercent: null
        }
    }

    async componentDidMount() {
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let day = await this.retrieveSoberDay()
        let hour = await this.retrieveDocumentName('sober_hour', taro0).sober_hour
        let minute = await this.retrieveDocumentName('sober_minute', taro0).sober_minute
        this.setState({
            sober_day: day,
            sober_hour: hour,
            sober_minute: minute,
            pureAlc: await this.retrievePureAlc(),
            beverage: await this.retrieveBeverage(),
            timestamps: await this.formatTimestamps(),
            timeUntilLimit: await this.retrieveTimeUntilLimit(),
        })
        this.retrieveLiquorLimits()
        console.warn(this.state)
    }

    selectBeverage(beverage) {
        this.setState({selected: beverage})
    }

    async tempFunctionToCallDocumentName(){
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        this.retrieveDocumentName("sober_hour", taro0)
    }

    retrieveDocumentName(variable, data){
        var dataArray = []; //extract the values from the data
        for(var o in data) {
            dataArray.push(data[o]);
        }
        // console.warn(dataArray)

        for(i = 0; i < dataArray.length; i++){
            if(variable in dataArray[i]){
                console.warn(dataArray[i])
                return dataArray[i]
            }
        }
    }

    async retrieveTimeUntilLimit (){
        console.warn("hi in retrievetimeuntillimit")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let estimated_time_left = this.retrieveDocumentName('estimated_time_left', taro0).estimated_time_left
        console.warn(estimated_time_left)
        return estimated_time_left
        
    }

    async retrieveSoberTime () {
        console.warn("hi in retrieve sober time")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let hour = this.retrieveDocumentName('sober_hour', taro0).sober_hour
        let minute = this.retrieveDocumentName('sober_minute', taro0).sober_minute
        console.warn(`${hour}:${minute}`)
        return `${hour}:${minute}`
    }

    async retrieveSoberDay () {
        console.warn("hi in retrieve sober day")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        let day = this.retrieveDocumentName('sober_day', taro0).sober_day
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

    async retrieveLiquorLimits () {
        console.warn("hi in retrieve retreive liquor limits")
        let taro = await db.ref(`/user_data`).get();
        let taro0 = JSON.parse(JSON.stringify(taro))
        console.warn(taro0)
        let current_amount = this.retrieveDocumentName("current_amount", taro0).current_amount
        let limit_amount = this.retrieveDocumentName("limit_amount", taro0).limit_amount

        let amountPercent = current_amount/limit_amount

        let current_pace = this.retrieveDocumentName("current_pace", taro0).current_pace
        let max_pace = this.retrieveDocumentName("max_pace", taro0).max_pace

        let pacePercent = current_pace/max_pace

        console.warn(amountPercent, pacePercent)
        this.setState({
            current_amount: current_amount,
            limit_amount: limit_amount,
            current_pace: current_pace,
            max_pace: max_pace,
            amountPercent: amountPercent*100,
            pacePercent: pacePercent*100
        })
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 15}}>
                        <View>
                            <Text style={{marginBottom: 15}}>Liquor consumed</Text>
                            <ProgressCircle
                                percent={this.state.amountPercent}
                                radius={60}
                                borderWidth={15}
                                color="pink"
                                shadowColor="#999"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.current_amount}/{this.state.limit_amount}g total</Text>
                            </ProgressCircle>
                        </View>
                        <View>
                            <Text style={{marginBottom: 15}}>Pace of consumption</Text>
                            <ProgressCircle
                                percent={this.state.pacePercent}
                                radius={60}
                                borderWidth={15}
                                color="pink"
                                shadowColor="#999"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.current_pace}/{this.state.max_pace}g per hour</Text>
                            </ProgressCircle>
                        </View>
                    </View>
                    <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Estimated </Text>
                            <Text style={{fontSize: 40}}>{this.state.timeUntilLimit} minutes</Text>
                            <Text> until limit reached.</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Will sober up at </Text>
                            <Text style={{fontSize: 40}}>{this.state.sober_hour}:{this.state.sober_minute} </Text>
                            <Text> ({this.state.sober_day})</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={() => this.retrieveBeverage()}>
                        <Text>Press to console.warn beverage stuff</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.formatTimestamps()}>
                        <Text>Press to console.warn timestamp stuff</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => this.retrieveLiquorLimits()}>
                        <Text>Press to console.warn dashboard stuff</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.warn(this.state)}>
                        <Text>Press to console.warn the current state</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.tempFunctionToCallDocumentName()}>
                        <Text>Press to retrieveDocumentName</Text>
                    </TouchableOpacity> */}
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