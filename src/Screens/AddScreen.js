import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class AddScreen extends Component {
    navigation = ""
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.state = {
            tap: null,
            amount: 0
        }
        this.getData()
    }
    getData = async () => {
        let data = await AsyncStorage.getItem("@tap")
        let data_js = JSON.parse(data)
        this.setState({ tap: data_js.tap })
    }
    change=(val) => {
        this.setState({amount: val})
    }
    add = () => {
         this.storeData()
    }
    storeData = async () => {
            let amount = this.state.amount
            if(this.state.tap == 0){
                amount = amount * -1
            }
         let data = await AsyncStorage.getItem("@my_wallet_data")
         if(data != null) {
              let result = JSON.parse(data)
              result.push(amount)
              result = JSON.stringify(result)
              await AsyncStorage.setItem("@my_wallet_data",result)
              this.navigation.replace("Home")
         }
         else
         {
             let result = []
             result.push(amount)
             result = JSON.stringify(result)
             await AsyncStorage.setItem("@my_wallet_data",result)
             this.navigation.replace("Home")
         }
    }

    addAmount = async () => {
      
        let data = {
            amount:amount
        }
        let data_json = JSON.stringify(data)
        AsyncStorage.setItem("@amount", data_json)
    }
    render() {
        return (
            <View style={styles.cont}>
                <Text style={{ fontSize: 30, color: "white", margin: 20, padding: 20 }}>Type:-
                    {this.state.tap === 1 ?
                        <Text>Income</Text>
                        :
                        <>
                            <Text >Expenses</Text>
                        </>
                    }
                </Text>

                <TextInput style={styles.input} placeholder="Add Money" keyboardType="number-pad" autoCorrect autoFocus onChangeText={(val)=>this.change(val)} />

                <TouchableOpacity style={styles.btn} onPress={this.add}>
                    <Text style={{ fontSize: 20, color: "white" }}> Add</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#6D8299"
    },
    input: {
        width: 250,
        height: 55,
        backgroundColor: "white",
        textAlign: 'center',
        borderRadius: 10,
        margin: 20
    },
    btn: {
        alignItems: 'center',
        margin: 20,
        width: 200,
        height: 50,
        backgroundColor: "teal",
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 10
    }
})
