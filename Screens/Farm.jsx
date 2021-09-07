import { StyleSheet, View, Text, Platform } from "react-native";
import React, { useEffect } from 'react'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButtons";
import { useSelector } from "react-redux";


const Farm = (props) => {
    const { route, navigation } = props
    // const cartPastOrders = useSelector(state => state.cart[`Farm${route.params.farm}`].pastOrders)
    // console.log(cartPastOrders)
    const goToCart = () => {
        navigation.navigate('cart', {
            cart: `${route.params.farm}`
        })
    }
    const goToStore = () => {
        navigation.navigate('store', {
            cart: `${route.params.farm}`
        })
    }


    useEffect(() => {
        navigation.setOptions({
            title: `Farm ${route.params.farm}`,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Cart'
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={goToCart} />
                    <Item
                        title='Store'
                        iconName={Platform.OS === 'android' ? 'md-add-circle-sharp' : 'ios-add-sharp'}
                        onPress={goToStore} />

                </HeaderButtons>
            )

        });
    }, []);

    return (
        <View style={stlyes.container}>
            <View style={stlyes.textContainer}>
                <Text style={stlyes.text}>Past Orders:</Text>
            </View>
            <View style={stlyes.pastOrders}>
                {/* {cartPastOrders.length !== 0 ? null : <Text>No Past orders found !</Text>} */}
            </View>
        </View>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    pastOrders: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginVertical: 10,
        fontSize: 23
    }


})


export default Farm