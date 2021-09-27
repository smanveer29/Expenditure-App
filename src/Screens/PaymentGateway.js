import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';


export default class PaymentGateway extends Component {


    constructor(props) 
    {
        super(props)    
        this.state ={
            amount:0
        }
    }

    pay = () => {

         let options = {
            description: 'Donation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_DNUEkkoKK6IdYK', // Your api key
            amount: parseInt(this.state.amount) * 100 ,
            name: 'Manveer',
            prefill: {
              email: 'manveer@gmail.com',
              contact: '1234567890',
              name: 'Manveer'
            },
            theme: {color: '#F37254'}
          }

        RazorpayCheckout.open(options)
      .then((res) => {
            // handle success
            alert(`Success: ${res.razorpay_payment_id}`);
          })
        .catch((e) => {
            // handle failure
            console.log(`Error: ${e}`);
         });

    }

    render() {
        return (
            <View style={styles.container}>

                    <TextInput style={styles.input} onChangeText={ (val) => this.setState({amount:val})} keyboardType='number-pad'></TextInput>

                    <TouchableOpacity style={styles.btn} onPress={this.pay}>
                        <Text style={{color: 'white'}}>Pay</Text>
                    </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        marginTop:10,
        width:200,
        height:50,
        borderWidth:1
    },
    btn:{
        height:60,
        width:200,
        backgroundColor:"teal",
        justifyContent:"center",
        alignItems:"center",
    }
})