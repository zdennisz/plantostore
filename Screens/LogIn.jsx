import { StyleSheet, View, Button } from "react-native";
import React from 'react'


const LogIn = (props) => {
    const { navigation } = props

    const pressHandler = () => {
        navigation.navigate('farms')
    }

    return (
        <View style={stlyes.container}>
            <Button title="Log In" onPress={pressHandler}></Button>

        </View>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }


})


export default LogIn