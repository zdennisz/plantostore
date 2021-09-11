import React from "react";
import CategoryList from "../components/CategoryList";
import { StyleSheet, View } from "react-native";

const Store = (props) => {
	const { route, navigation } = props;

	const showVeggieDesc = (elementId) => {
		navigation.navigate("veggieDsec", {
			id: elementId,
			cart: route.params.cart,
		});
	};

	return (
		<View style={styles.container}>
			<CategoryList showVeggieDesc={showVeggieDesc} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
	},
});

export default Store;
