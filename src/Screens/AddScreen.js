import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


const date = new Date()
export default class AddScreen extends Component {
    navigation = ""
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.state = {
            tap: null,
            amount: 0,
            note: ""
        }
        this.getData()
    }
    getData = async () => {
        let data = await AsyncStorage.getItem("@tap")
        let data_js = JSON.parse(data)
        this.setState({ tap: data_js.tap })
    }
    change = (val) => {
        this.setState({ amount: val })
    }
    add = () => {
        this.storeData()
    }
    storeData = async () => {
        let amount = this.state.amount
        let note = this.state.note
        if (this.state.tap == 0) 
        {
            amount = amount * -1
            note="-"+note
        }
        let data = await AsyncStorage.getItem("@my_wallet_data")
        if (data != null) {
            let result = JSON.parse(data)
            result.push(amount)
            result = JSON.stringify(result)
            await AsyncStorage.setItem("@my_wallet_data", result)
            this.navigation.replace("Home")
        }
        else {
            let result = []
            result.push(amount)
            result = JSON.stringify(result)
            await AsyncStorage.setItem("@my_wallet_data", result)
            this.navigation.replace("Home")
        }
    }
    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.header}>

                    <Text style={styles.text}>ADD:-
                    <Text style={styles.text}>{this.state.tap === 1 ?
                            <Text>Income</Text>
                            :
                            <>
                                <Text>Expenses</Text>
                            </>
                        }
                    </Text>
                    </Text>
                </View>
                <View style={styles.bottomCont}>
                    <TextInput style={styles.input} placeholder="Add Money" keyboardType="number-pad" autoCorrect onChangeText={(val) => this.change(val)} />
                    <TextInput style={styles.input} placeholder="Add Note" onChangeText={(val) => this.setState({ note: val })} />

                    <TouchableOpacity style={styles.btn} onPress={this.add}>
                        <Text style={{ fontSize: 20, color: "black" }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#5089C6"
    },
    input: {
        width: "80%",
        height: 55,
        backgroundColor: "#6D8299",
        textAlign: 'center',
        borderRadius: 10,
        margin: 10
    },
    header: {
        flex: 2,
    },
    text: {
        fontSize: 30,
        color: "white",
        margin: 20,
        padding: 20
    },
    btn: {
        alignItems: 'center',
        margin: 20,
        width: 150,
        height: 50,
        backgroundColor: "#F3D5C0",
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 10
    },
    bottomCont: {
        width: "100%",
        flex: 4,
        alignItems: "center",
        backgroundColor: "#082032",
        elevation: 10,
        padding: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    }
})
