import { StyleSheet, View, Button, Text, FlatList } from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	place_order,
	dec_cart_item,
	inc_cart_item,
	resotre_cart_order,
} from "../Store/Actions/cart";
import CartItem from "../components/CartItem";
import { cartPicker } from "../utils/cartHelper";

import useAppState from "../hooks/useAppState";

const Cart = (props) => {
	const { route } = props;
	const [farmType, SetFarmType] = useState(route.params.cart);
	//get data from redux

	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const cartOrders = useMemo(() => {
		return farmType === "farmA"
			? cart?.farmA?.cartOrders
			: cart?.farmB?.cartOrders;
	}, [cart.farmA, cart.farmB]);

	const cartItems = useMemo(() => {
		return cartOrders ? cartPicker(cartOrders) : [];
	}, [cartOrders]);

	//useAppState(handleStateChange);

	const placeOrderHandler = () => {
		dispatch(place_order());
	};

	const incCartItem = (prop) => {
		dispatch(inc_cart_item({ id: prop, cart: farmType }));
	};

	const decCartItem = (prop) => {
		dispatch(dec_cart_item({ id: prop, cart: farmType }));
	};
	const getData = () => {
		dispatch(resotre_cart_order({ cart: farmType }));
	};
	const handleStateChange = useCallback(async () => {
		try {
			if (farmType === "farmA") {
				await AsyncStorage.setItem(
					`${farmType}storeData`,
					JSON.stringify({ ...cart.farmA })
				);
			} else {
				await AsyncStorage.setItem(
					`${farmType}storeData`,
					JSON.stringify({ ...cart.farmB })
				);
			}
		} catch (err) {
			console.log(err);
		}
	}, [farmType, cart.farmA, cart.farmB]);

	useEffect(() => {
		//getData();
		return () => {
			//	handleStateChange();
		};
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
					<Button title='Place Order' onPress={placeOrderHandler}></Button>
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
});

export default Cart;
