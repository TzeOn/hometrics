import { Card } from "react-native-elements"; 
import React, { Component } from "react";
import { Button, Text } from "react-native";

export default class DeviceManagement extends Component { 
    constructor(props) { 
        super(props); 
    }

    render() { 
        return (
            <Card title="beans">
                <Text>The bean room</Text>
                <Button title="View Room"></Button>
            </Card>
        )
    }
}