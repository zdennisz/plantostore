import { StyleSheet, View, Text, FlatList } from "react-native";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { add_categories } from '../Store/Actions/categories'
import axios from "axios";
import { REACT_APP_AGWA_CATEGORIES } from '@env'


const Store = (props) => {
    const { navigation } = props
    const categories = useSelector(state => state.categories.allCategories)
    const dispatch = useDispatch()


    useEffect(() => {
        const getCategories = async () => {
            try {

                const res = await axios.get(`${REACT_APP_AGWA_CATEGORIES}`)

                dispatch(add_categories(res.data.categories))

            } catch (err) {
                console.log(err)
            }
        };

        getCategories()
    }, [])

    const navigateToCatHandler = (item) => {

        navigation.navigate('category', {
            plants: item.plants,
            category: item.name
        })
    }

    return (
        <View style={stlyes.container}>
            <View style={stlyes.listContainer}>
                <FlatList data={categories} keyExtractor={(item, index) => index.toString()} renderItem={itemData => <Text style={stlyes.item} onPress={navigateToCatHandler.bind(this, itemData.item)}>{itemData.item.name}</Text>} />
            </View>
        </View>
    )
}


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'green',
        textAlign: 'center',
        color: 'white',
        borderRadius: 10
    },
    listContainer: {
        marginTop: 100
    }


})


export default Store