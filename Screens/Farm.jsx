import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Platform, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customButtons/CustomHeaderButtons";
import { flatListItemParser } from "../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import VeggieCard from "../components/VeggieCard";
import Colors from "../utils/styles";
import { resotre_past_order } from "../Store/Actions/cart";
import { Ionicons } from "@expo/vector-icons";

const Farm = (props) => {
	const { route, navigation } = props;
	const [farmType] = useState(route.params.farm);
	const cartPastOrders = useSelector(
		(state) => state.cart[`${route.params.farm}`].pastOrders
	);
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

	const getPastOrdersData = (dispatch, getState) => {
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
				console.log("Error happened", err);
			});
	};

	useEffect(() => {
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
	},
	notFoundText: {
		color: Colors.textColor,
		fontSize: 24,
		marginTop: 24,
	},
});

export default Farm;
