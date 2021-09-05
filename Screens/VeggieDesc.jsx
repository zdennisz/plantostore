import { StyleSheet,View ,Text} from "react-native";
import React from 'react'


const VeggieDesc=(props)=>{
    const {route,navigation}=props
console.log(route.params.veggie)

    return (
            <View>
                <Text> {route.params.veggie}</Text>
            
            </View>
    )
}


const stlyes=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    
    
})


export default VeggieDesc