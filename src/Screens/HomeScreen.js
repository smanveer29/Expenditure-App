import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Transactions from '../components/Transactions'
import RazorpayCheckout from 'react-native-razorpay';

export default class HomeScreen extends Component {
    name = ""
    navigation = ""
    trans = []
    income = 0
    expense = 0
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.state = {
            name: "",
            amount: [],
            isLoading: true,
        }
        this.getUser()
        this.getLatestTransaction()
    }

    getLatestTransaction = async () => {
        let data = await AsyncStorage.getItem("@my_wallet_data")
        if (data != null) {
            let result = JSON.parse(data)
            this.trans = result
            this.setState({ isLoading: false })
        }
        else {
            this.trans=null
            this.setState({ isLoading: false })
        }
    }
    getUser = async () => {
        let data = await AsyncStorage.getItem("@user")
        let data_js = JSON.parse(data)
        this.setState({ name: data_js.userName })
    }
    add = () => {
        this.addAmount(1)
        this.navigation.navigate("Add")
    }
    sub = () => {
        this.addAmount(0)
        this.navigation.navigate("Add")
    }
    addAmount = async (flag) => {
        let store =
        {
            tap: flag
        }
        let data_json = JSON.stringify(store)
        AsyncStorage.setItem("@tap", data_json)

    }
    logout = () => {
        AsyncStorage.removeItem("@user")
        this.navigation.replace("Splash")
    }
    show = () => {
        let arr = []
        this.trans = this.trans.reverse()
        for (let i = 0; i < this.trans.length; i++) {
            arr.push(
                <View key={i} style={this.trans[i] > 0 ? styles.card : styles.card_danger}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{this.trans[i]}</Text>
                </View>
            )

        }
        return arr
    }
    render() {
        return (
            <View style={styles.homeCont}>

                <View style={styles.header}>
                    <View style={styles.textCont}>
                        <Text style={{ fontSize: 14, color: 'white' }}>Welcome</Text>
                        <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{this.state.name}</Text>
                    </View>

                    <TouchableOpacity onPress={this.logout}>
                        <Image style={styles.logo} source={{ uri: "https://www.fivesquid.com/pics/t2/1461262792-53831-1-1.jpg" }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.btnGroup}>
                    <TouchableOpacity style={styles.incBtn} onPress={this.add}>
                        <Image style={styles.img} source={{ uri: "https://cdn-icons-png.flaticon.com/128/4721/4721777.png" }} />

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>Income</Text>
                            <Text style={{ fontSize: 23 }}>{this.income}</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.expBtn} onPress={this.sub}>
                        <Image style={styles.img} source={{ uri: "https://png.pngtree.com/png-vector/20210214/ourmid/pngtree-red-arrow-down-png-image_2921045.jpg" }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>Expense</Text>
                            <Text style={{ fontSize: 23 }}>{this.expense}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.recent}>
                    <Text style={{ fontSize: 20, color: "white" }}>Recent Transactions</Text>
                    <ScrollView vertical="true" >
                        {
                            this.state.isLoading == true ? <Text>Loading</Text> : this.show()
                        }
                    </ScrollView>
                </View>

                <View style={styles.monthly}>
                <Text>HGello</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    homeCont: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#082032",
        paddingTop: 40,
    },
    header: {
        width: '90%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    incBtn: {
        flexDirection: "row",
        width: 170,
        height: 60,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#5E8B7E',
        justifyContent: 'space-evenly',
        borderRadius: 6,
        elevation: 10,
    },
    expBtn: {
        flexDirection: "row",
        width: 170,
        height: 60,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#F54748',
        justifyContent: 'space-evenly',
        borderRadius: 6,
        elevation: 10,
    },
    text: {
        color: "#293B5F",
        fontSize: 17
    },
    btnGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        flexDirection: "row",
        marginBottom: 20
    },
    inputGrp: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    input: {
        width: 150,
        height: 40, margin: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'grey'
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    recent: {
        height: 300,
        width: "100%",
        padding: 20,
        borderRadius: 10,
    }
    ,
    card: {
        width: '100%',
        height: 70,
        backgroundColor: '#5E8B7E',
        justifyContent: 'center',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 4,
        borderTopRightRadius: 10,
        borderColor: 'green',
        marginTop: 10,
    },
    card_danger: {
        width: '100%',
        height: 70,
        backgroundColor: '#F54748',
        justifyContent: 'center',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderLeftWidth: 4,
        borderColor: 'red',
        marginTop: 10,
    },
    monthly:{
        flex:2,
        width:"100%",
        backgroundColor:'#DFEEEA',
        elevation: 10,
        padding:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }
})
