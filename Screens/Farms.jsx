import { StyleSheet, View, Button, AppState } from "react-native";
import React from 'react'
import { useEffect, useState } from "react";



const Farms = (props) => {
    const [appState, setAppState] = useState(AppState.currentState);
    const { navigation } = props
    const goToFarmAhandler = () => {
        navigation.navigate('farm', {
            farm: 'A'
        })
    }

    const goToFarmBhandler = () => {
        navigation.navigate('farm', {
            farm: 'B'
        })
    }


    const handleAppStateChange = (nextAppState) => {

    }

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [])

    return (
        <View style={stlyes.container}>
            <Button title="Farm A" onPress={goToFarmAhandler}></Button>
            <Button title="Farm B" onPress={goToFarmBhandler}></Button>
        </View>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }


})


export default Farms