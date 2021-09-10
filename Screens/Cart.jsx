import React, { useEffect, useState } from "react";
import { flatListItemParser } from "../utils/helper";
import { set_item_id } from "../Store/Actions/itemId";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VeggieCard from "../components/VeggieCard";
import {
	place_order,
	dec_cart_item,
	inc_cart_item,
	resotre_cart_order,
} from "../Store/Actions/cart";
import CustomButton from "../components/CustomButton";

const Cart = (props) => {
	const { route } = props;
	const [farmType] = useState(route.params.cart);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const cartOrders =
		farmType === "farmA" ? cart?.farmA?.cartOrders : cart?.farmB?.cartOrders;

	const cartItems = cartOrders ? flatListItemParser(cartOrders) : [];

	const placeOrderHandler = () => {
		dispatch(place_order({ cart: farmType }));
	};

	const incCart = (dispatch, getState, itemId) => {
		dispatch(inc_cart_item({ id: itemId, cart: farmType }));
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		try {
			AsyncStorage.setItem(`${farmType}storeData`, JSON.stringify({ ...farm }));
		} catch (err) {
			console.log(err);
		}
	};

	const decCart = (dispatch, getState, itemId) => {
		dispatch(dec_cart_item({ id: itemId, cart: farmType }));
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		try {
			AsyncStorage.setItem(`${farmType}storeData`, JSON.stringify({ ...farm }));
		} catch (err) {
			console.log(err);
		}
	};

	const incCartItem = (itemId) => {
		dispatch(set_item_id(itemId));
		dispatch(incCart);
	};

	const decCartItem = (itemId) => {
		dispatch(set_item_id(itemId));
		dispatch(decCart);
	};

	const getData = (dispatch, getState) => {
		AsyncStorage.getItem(`${farmType}storeData`)
			.then((storeData) => {
				const parsedData = JSON.parse(storeData);
				if (parsedData != null) {
					dispatch(
						resotre_cart_order({ cart: farmType, cartItems: parsedData })
					);
				}
			})
			.catch((err) => {
				console.log("Error happened", err);
			});
	};

	useEffect(() => {
		dispatch(getData);
	}, []);

	return (
		<View style={styles.container}>
			{cartItems.length < 1 ? (
				<View style={styles.ordersView}>
					<Text>No Orders placed...</Text>
				</View>
			) : (
				<>
					<View style={styles.ordersView}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={cartItems}
							keyExtractor={(item) => item.id}
							renderItem={(veggieContainer) => (
								<VeggieCard
									veggie={veggieContainer.item}
									incCartItem={incCartItem}
									decCartItem={decCartItem}
									isDisplayAmount={true}
									isAmountEditable={true}
								/>
							)}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='Checkout'
							pressHandler={placeOrderHandler}
							isImage={false}
							customStyle={{ width: "150%" }}
						/>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	ordersView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50,
		backgroundColor: "white",
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
		height: 50,
		width: 350,
	},
});

export default Cart;
