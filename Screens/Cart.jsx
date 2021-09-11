import React, { useEffect, useState, useRef } from "react";
import Colors from "../utils/styles";
import VeggieCard from "../components/VeggieCard";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "../components/customButtons/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { set_item_id } from "../Store/Actions/itemId";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList } from "react-native";
import {
	place_order,
	dec_cart_item,
	inc_cart_item,
	resotre_cart_order,
	resotre_past_order,
} from "../Store/Actions/cart";
import {
	flatListItemParser,
	saveLocalStorageData,
	saveExternalStorageData,
	loadExternalStorageData,
} from "../utils/helper";

const Cart = (props) => {
	const { route } = props;
	const [farmType] = useState(route.params.cart);
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth);
	const isOnline = useRef(false);
	const dispatch = useDispatch();

	const cartOrders =
		farmType === "farmA" ? cart?.farmA?.cartOrders : cart?.farmB?.cartOrders;

	const cartItems = cartOrders ? flatListItemParser(cartOrders) : [];

	const placeOrderHandler = () => {
		dispatch(placeOrder);
	};

	const incCartItemHandler = (itemId) => {
		// Updates the store with selected item id to increment amount from cart of that item
		dispatch(set_item_id(itemId));
		dispatch(incCart);
	};

	const decCartItemHandler = (itemId) => {
		// Updates the store with selected item id to decetement amount from cart of that item
		dispatch(set_item_id(itemId));
		dispatch(decCart);
	};

	// Save in the local storage the purched order as past orders & the cleared cart as orders
	const placeOrder = (dispatch, getState) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(place_order({ cart: farmType }));
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;

		saveLocalStorageData(`${farmType}pastStoreData`, farm);
		saveLocalStorageData(`${farmType}storeData`, farm);
		saveExternalStorageData(farm, farmType, user.firebaseUserId);
	};

	const incCart = (dispatch, getState, itemId) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(inc_cart_item({ id: itemId, cart: farmType }));
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		saveLocalStorageData(`${farmType}storeData`, farm);
		saveExternalStorageData(farm, farmType, user.firebaseUserId);
	};

	const decCart = (dispatch, getState, itemId) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(dec_cart_item({ id: itemId, cart: farmType }));
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		saveLocalStorageData(`${farmType}storeData`, farm);
		saveExternalStorageData(farm, farmType, user.firebaseUserId);
	};

	const loadCartOrders = async (dispatch, getState) => {
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		try {
			const res = await loadExternalStorageData(user.firebaseUserId, farmType);
			if (res.data) {
				dispatch(resotre_past_order({ cart: farmType, cartItems: res.data }));
				saveLocalStorageData(`${farmType}storeData`, farm);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getCartOrdersData = (dispatch, getState) => {
		// Display cart orders from DB if online, else from local storage
		if (isOnline) {
			loadCartOrders(dispatch, getState);
		} else {
			AsyncStorage.getItem(`${farmType}storeData`)
				.then((storeData) => {
					const parsedData = JSON.parse(storeData);
					if (parsedData) {
						// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
						dispatch(
							resotre_cart_order({ cart: farmType, cartItems: parsedData })
						);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			const online = !!state.isConnected;
			isOnline.current = online;
		});
		dispatch(getCartOrdersData);
		return () => unsubscribe();
	}, []);

	return (
		<View style={styles.container}>
			{cartItems.length < 1 ? (
				<View style={styles.notFoundContainer}>
					<Ionicons
						name='leaf'
						size={80}
						style={styles.image}
						color={Colors.primary}
					/>
					<Text style={styles.notFoundText}>
						Didn't find any plants in your cart :(
					</Text>
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
									incCartItemHandler={incCartItemHandler}
									decCartItemHandler={decCartItemHandler}
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
	notFoundContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
	},
	notFoundText: {
		color: Colors.textColor,
		fontSize: 20,
		marginTop: 24,
	},
});

export default Cart;
