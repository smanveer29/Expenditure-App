import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Transactions extends Component {
    amount = []
    constructor(props) {
        super(props)
        this.state = {
            tap: null,
        }
        this.amount.push(props.amount)
        this.getTap()
    }
    getTap = async () => {
        let tap = await AsyncStorage.getItem("@tap")
        let data = JSON.parse(tap)
        this.setState({ tap: data.tap })
        console.log(data);
    }

    render() {
        return (
            <>
                {
                    this.state.tap === 1
                        ?
                        <View style={styles.card1}>
                            <Text style={styles.text}>{this.amount}</Text>
                        </View>
                        :
                        <View style={styles.card0}>
                            <Text style={styles.text}>{this.amount}</Text>
                        </View>
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    card1: {
        width: '100%',
        height: 60,
        backgroundColor: 'teal',
        justifyContent: 'center',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 2,
        borderColor: 'green',
        marginTop: 10,
    },
    card0: {
        width: '100%',
        height: 60,
        backgroundColor: 'teal',
        justifyContent: 'center',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 2,
        borderColor: 'red',
        marginTop: 10,
    },
    text: {
        color: 'white',
        fontSize: 23
    }

})
