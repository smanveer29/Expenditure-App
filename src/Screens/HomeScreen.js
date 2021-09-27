import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Transactions from '../components/Transactions'
import RazorpayCheckout from 'react-native-razorpay';

export default class HomeScreen extends Component {
    name = ""
    navigation = ""
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.state = {
            name: "",
            amount: 0,
        }
        this.getUser()
    }
    getUser=async()=>{
        let data=await AsyncStorage.getItem("@user")
        let data_js=JSON.parse(data)
        this.setState({name:data_js.userName})
        await AsyncStorage.removeItem("@tap")
    }
    add=()=>{
        this.addIncome(1)
        this.navigation.navigate("Add")
    }
    sub=()=>{
        this.addExpense(0)
        this.navigation.navigate("Add")
    }
    addExpense=async (flag)=>{
        let store={
            tap:flag
        }
        let data_json=JSON.stringify(store)
        AsyncStorage.setItem("@tap",data_json)
        
    }
    addIncome=async (flag)=>{
        let store={
            tap:flag
        }
        let data_json=JSON.stringify(store)
        AsyncStorage.setItem("@tap",data_json)
    }
    // pay=()=>{
    //     let options = {
    //         description: 'Donation',
    //         image: 'https://i.imgur.com/3g7nmJC.png',
    //         currency: 'INR',
    //         key: 'rzp_test_DNUEkkoKK6IdYK', // Your api key
    //         amount: parseInt(this.state.amount) * 100 ,
    //         name: 'Manveer',
    //         prefill: {
    //           email: 'manveer@gmail.com',
    //           contact: '1234567890',
    //           name: 'Manveer'
    //         },
    //         theme: {color: '#F37254'}
    //       }

    //       RazorpayCheckout.open(options)
    //       .then((res) => {
    //             // handle success
    //             alert(`Success: ${res.razorpay_payment_id}`);
    //           })
    //         .catch((e) => {
    //             // handle failure
    //             console.log(`Error: ${e}`);
    //          });

    // }
    render() {
        return (
            <View style={styles.homeCont}>

                <View style={styles.header}>
                    <View style={styles.textCont}>
                        <Text style={{ fontSize: 14, color: 'white' }}>Welcome</Text>
                        <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold',textTransform:'uppercase' }}>{this.state.name}</Text>
                    </View>

                    <TouchableOpacity>
                    <Image style={styles.logo} source={{ uri: "https://www.fivesquid.com/pics/t2/1461262792-53831-1-1.jpg" }} />
                    </TouchableOpacity>
                </View>


                <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.btn} onPress={this.add}>
                        <Image style={styles.img} source={{ uri: "https://media.istockphoto.com/vectors/cost-symbol-increase-icon-vector-symbol-image-isolated-on-background-vector-id1168793313?b=1&k=20&m=1168793313&s=612x612&w=0&h=Q9CXCWcWGKxW0ntbqR67gbAp9PsI2-9avgfcpVc89rQ=" }} />
                        <Text style={styles.text}>Income</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={this.sub}>
                        <Image style={styles.img} source={{ uri: "https://media.istockphoto.com/vectors/cost-symbol-increase-icon-vector-symbol-image-isolated-on-background-vector-id1168793313?b=1&k=20&m=1168793313&s=612x612&w=0&h=Q9CXCWcWGKxW0ntbqR67gbAp9PsI2-9avgfcpVc89rQ=" }} />
                        <Text style={styles.text}>Expenses</Text>
                    </TouchableOpacity>

                   
                </View>

                {/* <View style={styles.recent}>
                <Transactions/>
                </View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    homeCont: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#6D8299"
    },
    header: {
        width: '90%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:40
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius:50
    },
    btn: {
        flexDirection: "row",
        width: 150,
        height: 50,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: "teal",
        justifyContent: 'space-around',
        borderRadius: 5,
        elevation:10,
    },
    text: {
        color: "white",
        fontSize: 17
    },
    btnGroup: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
        flexDirection: "row",marginBottom:60
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
    recent:{
        width:"100%",
        height:500,
        padding:20,
        backgroundColor:'white'
    }
})