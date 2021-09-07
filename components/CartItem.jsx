import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const CartItem = (props) => {
	const { id, name, amount } = props;

	const addCartItem = () => {
		props.incCartItem(id);
	};

	const decCartItem = () => {
		props.decCartItem(id);
	};

	return (
		<View style={styles.cartItemContainer}>
			<View style={styles.nameContainer}>
				<Text>{name}</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button title='+' onPress={addCartItem} />
				<Text style={{ marginHorizontal: 10 }}>{amount}</Text>
				<Button title='-' onPress={decCartItem} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItemContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 15,
	},
	nameContainer: {
		maxWidth: "80%",
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		maxWidth: "20%",
		marginHorizontal: 20,
	},
});

export default CartItem;
