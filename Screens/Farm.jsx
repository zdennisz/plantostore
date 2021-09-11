import React, { useEffect, useRef, useState } from "react";
import Colors from "../utils/styles";
import VeggieCard from "../components/VeggieCard";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeaderButton from "../components/customButtons/CustomHeaderButtons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { loadExternalStorageData } from "../utils/helper";
import { resotre_past_order } from "../Store/Actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StyleSheet, View, Text, Platform, FlatList } from "react-native";
import { flatListItemParser, saveLocalStorageData } from "../utils/helper";

const Farm = (props) => {
	const { route, navigation } = props;
	const [farmType] = useState(route.params.farm);
	const cartPastOrders = useSelector(
		(state) => state.cart[`${route.params.farm}`].pastOrders
	);
	const user = useSelector((state) => state.auth);
	const isOnline = useRef(false);
	const dispatch = useDispatch();

	const farmPastItems = cartPastOrders
		? flatListItemParser(cartPastOrders)
		: [];

	const goToCart = () => {
		navigation.navigate("cart", {
			cart: `${route.params.farm}`,
		});
	};

	const goToStore = () => {
		navigation.navigate("store", {
			cart: `${route.params.farm}`,
		});
	};

	const goToVeggieDesc = (veggie) => {
		navigation.navigate("veggieDsec", {
			id: veggie.id,
			cart: route.params.farm,
		});
	};

	const loadPastOrders = async (dispatch, getState) => {
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;
		try {
			const res = await loadExternalStorageData(user.firebaseUserId, farmType);
			if (res.data) {
				dispatch(resotre_past_order({ cart: farmType, cartItems: res.data }));
				saveLocalStorageData(`${farmType}pastStoreData`, farm);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getPastOrdersData = (dispatch, getState) => {
		// Display past orders from DB if online, else from local storage
		if (isOnline) {
			loadPastOrders(dispatch, getState);
		} else {
			AsyncStorage.getItem(`${farmType}pastStoreData`)
				.then((pastStoreData) => {
					const parsedData = JSON.parse(pastStoreData);
					if (parsedData) {
						dispatch(
							resotre_past_order({ cart: farmType, cartItems: parsedData })
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

		navigation.setOptions({
			title: `Farm ${route.params.farm.slice(-1)}`,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title='Cart'
						iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
						onPress={goToCart}
					/>
					<Item
						title='Store'
						iconName={
							Platform.OS === "android"
								? "md-add-circle-sharp"
								: "ios-add-sharp"
						}
						onPress={goToStore}
					/>
				</HeaderButtons>
			),
		});

		dispatch(getPastOrdersData);
		return () => unsubscribe();
	}, []);

	return (
		<View style={styles.container}>
			{farmPastItems.length > 0 ? (
				<>
					<View style={styles.textContainer}>
						<Text style={styles.text}>Plants in your farm:</Text>
					</View>
					<View style={styles.flatListContainer}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={farmPastItems}
							keyExtractor={(item) => item.id}
							renderItem={(veggieContainer) => (
								<VeggieCard
									veggie={veggieContainer.item}
									isDisplayAmount={true}
									isAmountEditable={false}
									pressVeggieHandler={goToVeggieDesc}
								/>
							)}
						/>
					</View>
				</>
			) : (
				<View style={styles.notFoundContainer}>
					<Ionicons
						name='leaf'
						size={80}
						style={styles.image}
						color={Colors.primary}
					/>
					<Text style={styles.notFoundText}>
						Didn't find any plants in your farm :(
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "white",
	},
	textContainer: {
		height: "8%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		width: "100%",
	},
	text: {
		marginVertical: 10,
		fontSize: 23,
		color: "white",
	},
	flatListContainer: {
		width: "80%",
		height: "92%",
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
		textAlign: "center",
	},
});

export default Farm;
