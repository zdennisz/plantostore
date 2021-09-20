import React, { useEffect, useState, useRef } from "react";
import Colors from "../utils/styles";
import VeggieCard from "../components/VeggieCard";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "../components/customButtons/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { set_selected_veggie_id } from "../Store/Actions/selectedVeggieId";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList } from "react-native";
import {
	place_order,
	decrement_cart_item,
	increment_cart_item,
	resotre_cart_order,
	restore_farm_veggie,
} from "../Store/Actions/cart";
import {
	flatListItemParser,
	saveLocalStorageData,
	saveExternalStorageData,
	loadExternalStorageData,
	hapticFeedback,
} from "../utils/helper";

const Cart = (props) => {
	const { route } = props;
	const [farmId] = useState(route.params.farmId);
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth);
	const isOnline = useRef(false);
	const dispatch = useDispatch();

	const cartOrders = cart[farmId]?.cartOrders;
	const cartItems = cartOrders ? flatListItemParser(cartOrders) : [];

	const placeOrderHandler = () => {
		dispatch(placeOrder);
	};

	const incrementCartItemHandler = (selectedVeggieId) => {
		// Updates the store with selected veggie id to increment amount from cart of that veggie
		dispatch(set_selected_veggie_id(selectedVeggieId));
		dispatch(incrementCart);
	};

	const decrementCartItemHandler = (selectedVeggieId) => {
		// Updates the store with selected veggie id to decetement amount from cart of that veggie
		dispatch(set_selected_veggie_id(selectedVeggieId));
		dispatch(decrementCart);
	};

	// Save in the local storage the purched order as farm veggies orders & the cleared cart as orders
	const placeOrder = (dispatch, getState) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(place_order({ farmId: farmId }));
		const farm = getState().cart[farmId];

		saveLocalStorageData(`${farmId}farmVeggiesStoreData`, farm);
		saveLocalStorageData(`${farmId}storeData`, farm);
		saveExternalStorageData(farm, farmId, user.firebaseUserId);
		hapticFeedback("light");
	};

	const incrementCart = (dispatch, getState, selectedVeggieId) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(increment_cart_item({ id: selectedVeggieId, farmId: farmId }));
		const farm = getState().cart[farmId];
		saveLocalStorageData(`${farmId}storeData`, farm);
		saveExternalStorageData(farm, farmId, user.firebaseUserId);
		hapticFeedback("light");
	};

	const decrementCart = (dispatch, getState, selectedVeggieId) => {
		// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
		dispatch(decrement_cart_item({ id: selectedVeggieId, farmId: farmId }));
		const farm = getState().cart[farmId];
		saveLocalStorageData(`${farmId}storeData`, farm);
		saveExternalStorageData(farm, farmId, user.firebaseUserId);
		hapticFeedback("light");
	};

	const loadCartOrders = async (dispatch, getState) => {
		const farm = getState().cart.farmId;
		try {
			const res = await loadExternalStorageData(user.firebaseUserId, farmId);
			if (res.data) {
				dispatch(resotre_cart_order({ farmId: farmId, cartItems: res.data }));
				saveLocalStorageData(`${farmId}storeData`, farm);
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
			AsyncStorage.getItem(`${farmId}storeData`)
				.then((storeData) => {
					const parsedData = JSON.parse(storeData);
					if (parsedData) {
						// Function is used via middelawre to sync the dispatch operation with the store and preform the save once the store update is done
						dispatch(
							resotre_cart_order({ cart: farmId, cartItems: parsedData })
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
						Didn't find any veggies in your cart :(
					</Text>
				</View>
			) : (
				<>
					<View style={styles.ordersView}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={cartItems}
							keyExtractor={(veggie) => veggie.id}
							renderItem={(veggieContainer) => (
								<VeggieCard
									veggie={veggieContainer.item}
									incrementCartItemHandler={incrementCartItemHandler}
									decrementCartItemHandler={decrementCartItemHandler}
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
