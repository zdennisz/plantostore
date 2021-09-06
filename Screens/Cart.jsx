import { StyleSheet, View, Button, Text, FlatList } from "react-native";
import React from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { place_order, dec_cart_item, inc_cart_item } from "../Store/Actions/cart";
import CartItem from '../components/CartItem'

const Cart = () => {
    //get data from redux
    const cart = useSelector(state => {
        const cartItems = []
        for (const key in state.cart.cartOrders) {
            cartItems.push({
                id: key,
                name: state.cart.cartOrders[key].name,
                amount: state.cart.cartOrders[key].amount
            })
        }

        return cartItems.sort((a, b) => a.id < b.id ? 1 : -1)
    })
    const dispatch = useDispatch()

    const placeOrderHandler = () => {
        dispatch(place_order())
    }


    const incCartItem = (prop) => {
        dispatch(inc_cart_item(prop))
    }

    const decCartItem = (prop) => {
        dispatch(dec_cart_item(prop))
    }

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