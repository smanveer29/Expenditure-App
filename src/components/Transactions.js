import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Transactions extends Component {
    constructor(props) {
        super(props)
        this.state={
            amount:0
        }
    }
    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Transaction</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    card:{
        width: '100%',
        height:60,
        backgroundColor:'teal',
        justifyContent:'center',
        padding: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderLeftWidth:2,
        borderColor:'red'
    },
    text:{
        color:'white',
        fontSize:23
    }

})
