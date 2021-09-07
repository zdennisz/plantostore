import { StyleSheet, View, Button, Text, FlatList } from "react-native";
import React from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { place_order, dec_cart_item, inc_cart_item, resotre_cart_order } from "../Store/Actions/cart";
import CartItem from '../components/CartItem'
import { cartPicker } from "../utils/cartHelper";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//
const Cart = (props) => {

    const { route } = props
    const farmType = route.params.cart
    //get data from redux
    const cart = useSelector(state => {

        let allFarmOrders;
        if (farmType === 'farmA') {
            allFarmOrders = state.cart.farmA.cartOrders
        } else {
            allFarmOrders = state.cart.farmB.cartOrders
        }
        return state?.cart?.farmA?.cartOrders ? cartPicker(allFarmOrders) : []

    })



    const dispatch = useDispatch()

    const placeOrderHandler = () => {
        dispatch(place_order())
    }


    const incCartItem = (prop) => {
        dispatch(inc_cart_item({ id: prop, cart: farmType }))
    }

    const decCartItem = (prop) => {
        dispatch(dec_cart_item(prop))
    }



    useEffect(() => {
        const getData = async () => {
            try {
                let data = []
                const storeData = await AsyncStorage.getItem(`${route.params.cart}storeData`)
                const parsedData = JSON.parse(storeData)
                if (parsedData != null) {
                    for (const key in parsedData) {

                        data.push({ ...parsedData[key] })
                    }

                    dispatch(resotre_cart_order(data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        // getData()
        return () => {
            const saveData = async () => {
                try {
                    await AsyncStorage.setItem(`${route.params.cart}storeData`, JSON.stringify({ ...cart }))
                } catch (err) {
                    console.log(err)
                }
            }
            // saveData()
        }
    }, [])
    return (
        <View style={stlyes.container}>
            {cart.length < 1 ?
                <View style={stlyes.ordersView}>
                    <Text>No Orders placed...</Text>
                </View> :
                <View style={stlyes.ordersView}>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={itemData => <CartItem id={itemData.item.id} name={itemData.item.name} incCartItem={incCartItem} decCartItem={decCartItem} amount={itemData.item.amount} />} />
                    <Button title="Place Order" onPress={placeOrderHandler}></Button>
                </View>
            }

        </View>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ordersView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Cart