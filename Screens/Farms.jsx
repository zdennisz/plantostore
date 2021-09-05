import { StyleSheet,View,Button } from "react-native";
import React from 'react'


const Farms=()=>{



    return (
            <View style={stlyes.container}>
                <Button title="Farm A"></Button>
                <Button title="Farm B"></Button>
            </View>
    )
}


const stlyes=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    }
    
    
})


export default Farms