import React, { useEffect } from "react";
import { StyleSheet, View, Text, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButtons";
import { flatListItemParser } from "../utils/helper";
import { useSelector } from "react-redux";
import VeggieCard from "../components/VeggieCard";
const Farm = (props) => {
	const { route, navigation } = props;
	const cartPastOrders = useSelector(
		(state) => state.cart[`${route.params.farm}`].pastOrders
	);
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
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.pastOrders}>
				{farmPastItems.length > 0 ? (
					<>
						<View style={styles.textContainer}>
							<Text style={styles.text}>Past Orders:</Text>
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
									/>
								)}
							/>
						</View>
					</>
				) : (
					<Text>No Past orders found !</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	pastOrders: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginVertical: 10,
		fontSize: 23,
	},
	flatListContainer: {
		width: "80%",
	},
});

export default Farm;
