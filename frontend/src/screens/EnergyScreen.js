import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button , Picker } from 'react-native';
import PureChart from 'react-native-pure-chart'; 
import { ScrollView } from 'react-native-gesture-handler';

export default class EnergyScreen extends Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            weekly: [],
            monthly: [],
            yearly: [],
            scoreboard: null, 
            comparison: [],
            filterLabel: "Weekly"
        }
    }

    // Mock data - still to implement server-side before adding fetch function here. 
    getData() { 
        this.state.monthly = [
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
        ]; 
        this.state.weekly = [
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10}
        ]; 
        this.state.yearly = [
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
        ];
        this.state.scoreboard = [
            {x: "Yaseen", y: 1}, 
            {x: "Lee", y: 2}, 
            {x: "Eoghann", y: 3},
            {x: "Ram", y:4},
            {x: "Mike", y:5}
        ];
        this.state.comparison = [
            {
                value: 50,
                label: 'House',
                color: 'red',
            },
            {
                value: 25,
                label: 'You',
                color: 'green'
            }
        ]
        this.state.filter = this.state.weekly;
    }

    componentWillMount() { 
        this.getData(); 
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex:1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: "space-between"
            },
            textStyle: {
                color: 'white',
                fontSize: 20, 
            }
         });

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.time}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) => {
                            switch(itemValue) { 
                                case "weekly": 
                                    this.setState({time: itemValue, filter: this.state.weekly});
                                    break; 
                                case "monthly": 
                                    this.setState({time: itemValue, filter: this.state.monthly});
                                    break;
                                case "yearly": 
                                    this.setState({time: itemValue, filter: this.state.yearly});
                                    break;  
                            }
                        }
                        }>
                        <Picker.Item label="Weekly" value="weekly"/>
                        <Picker.Item label="Monthly" value="monthly"/>
                        <Picker.Item label="Yearly" value="yearly"/>
                    </Picker>
                    
                    <Text style={styles.textStyle}>Personal Statistics</Text>
                    <PureChart data={this.state.filter}
                    backgroundColor={"black"} 
                    primaryColor = {"white"}
                    height = {200}
                    type="line"/>

                    <Text style={styles.textStyle}>Scoreboard</Text>
                    <View>
                        <PureChart data={this.state.scoreboard}
                        backgroundColor={"black"}
                        type={"bar"}
                        height = {200}
                        primaryColor={"white"}/>
                    </View>

                    <Text style={styles.textStyle}>Comparison</Text>
                    <View>
                        <PureChart data={this.state.comparison} type='pie' />
                    </View>
                </View>
            </ScrollView>
        )
    }
} 