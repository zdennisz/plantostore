import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { REACT_APP_AGWA_PLANTS } from '@env'
import { useDispatch } from "react-redux";
import { add_to_cart } from '../Store/Actions/cart'
const VeggieDesc = (props) => {
    const { route, navigation } = props
    const [veggieData, SetVeggieData] = useState()
    const dispatch = useDispatch()
    const addVeggieToCart = () => {

        dispatch(add_to_cart({ id: route.params.id, name: veggieData.name }))
    }

    useEffect(() => {
        const getVeggieData = async () => {
            try {
                const res = await axios.get(`${REACT_APP_AGWA_PLANTS}`)

                const filteredData = res.data.plants.find(item => item.id === route.params.id)

                SetVeggieData(filteredData)
            } catch (err) {
                console.log(err)
            }
        }

        getVeggieData()
    }, [])

    return (
        <ScrollView>

            {veggieData ? (<View style={stlyes.container}>
                <Text>{veggieData.name}</Text>
                <Text>Description : {veggieData.description}</Text>
                <Text>Life Cycle : {veggieData.lifeCycle}</Text>
                <Text>Nutritional Facts: </Text>
                <View style={stlyes.table}>
                    {veggieData.nutritionFacts.items.map((item, index) => {
                        return (<View key={index.toString()} style={stlyes.rowContainer}>
                            <Text>{item.key}</Text>
                            <Text>{item.nutrientValue}</Text>
                            <Text>{item.percentageOfRDA}</Text>
                        </View>)
                    })}
                </View>
                <Button title="Add to Cart" onPress={addVeggieToCart}></Button>
            </View>) : null
            }

        </ScrollView>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    table: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }


})


export default VeggieDesc