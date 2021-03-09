import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebaseConfig';
import ProgressCircle from 'react-native-progress-circle'
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import AlcoholVisualBar from '../components/AlcoholVisualBar'

export default class HomeScreen extends React.Component {
    state = {
        selected: null,
    }

    selectBeverage(beverage) {
        // console.warn("selecting", beverage);
        this.setState({selected: beverage})
    }

    flattenObject = (obj) => {
        const flattened = {}
      
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, this.flattenObject(obj[key]))
            console.warn("continue flattening")
          } else {
            flattened[key] = obj[key]
            console.warn("finished flattening")
          }
        })
      
        return flattened
      }

    async retrieveSoberTime () {
        let taro = await db.ref(`/user_data`).get();
        console.warn("taro is: ", taro);
        let hour = this.flattenObject(taro)
        console.warn(hour)
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
                        <Text>press this to conscole.warn taro</Text>
                    </TouchableOpacity>
                    <Text>Liquor consumed</Text>
                    <ProgressCircle
                        percent={30}
                        radius={60}
                        borderWidth={15}
                        color="#3399FF"
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
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{'81/75g'}</Text>
                    </ProgressCircle>
                    {/* <AnimatedGaugeProgress
                        size={200}
                        width={15}
                        fill={100}
                        rotation={90}
                        cropDegree={90}
                        tintColor="#4682b4"
                        delay={0}
                        backgroundColor="#b0c4de"
                        stroke={[2, 2]} //For a equaly dashed line
                        strokeCap="circle" /> */}
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