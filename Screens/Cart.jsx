import React, { useEffect, useState } from "react";
import { cartPicker } from "../utils/cartHelper";
import { set_item_id } from "../Store/Actions/itemId";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../components/CartItem";
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

	const cartItems = cartOrders ? cartPicker(cartOrders) : [];

	const placeOrderHandler = () => {
		dispatch(place_order());
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
				console.log("Error happen", err);
			});
	};

	useEffect(() => {
		dispatch(getData);
	}, []);

	return (
		<View style={stlyes.container}>
			{cartItems.length < 1 ? (
				<View style={stlyes.ordersView}>
					<Text>No Orders placed...</Text>
				</View>
			) : (
				<View style={stlyes.ordersView}>
					<FlatList
						data={cartItems}
						keyExtractor={(item) => item.id}
						renderItem={(itemData) => (
							<CartItem
								id={itemData.item.id}
								name={itemData.item.name}
								incCartItem={incCartItem}
								decCartItem={decCartItem}
								amount={itemData.item.amount}
							/>
						)}
					/>
					<View style={stlyes.buttonContainer}>
						<CustomButton
							title='Place Order'
							pressHandler={placeOrderHandler}
							isImage={false}
						/>
					</View>
				</View>
			)}
		</View>
	);
};

const stlyes = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	ordersView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Cart;
