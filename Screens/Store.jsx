import { StyleSheet, View } from "react-native";
import React from "react";
import GroupedVeggies from "../components/GroupedVeggies";
import Colors from "../utils/styles";

const Store = (props) => {
	const { route, navigation } = props;

	const showVeggieDesc = (elementId) => {
		console.log("elementId", elementId);
		navigation.navigate("veggieDsec", {
			id: elementId,
			cart: route.params.cart,
		});
	};

	return (
		<View style={styles.container}>
			<GroupedVeggies showVeggieDesc={showVeggieDesc} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
});

export default Store;
