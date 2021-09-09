import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../utils/styles";

import CustomRoundButton from "./CustomRoundButton";

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
			<View style={styles.imageContainer}>
				<Text>PlaceHolder for image</Text>
			</View>
			<View style={styles.rightSideConainer}>
				<View style={styles.nameContainer}>
					<Text style={styles.titleText}>{name}</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<CustomRoundButton title='+' pressHandler={addCartItem} />
					<Text style={styles.text}>{amount}</Text>
					<CustomRoundButton title='-' pressHandler={decCartItem} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItemContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
		marginVertical: 16,
		marginHorizontal: 24,
		borderWidth: 2,
		borderRadius: 8,
		padding: 8,
		backgroundColor: "white",
		borderColor: Colors.secondary,
		elevation: 5,
	},
	nameContainer: {},
	buttonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "green",
	},
	rightSideConainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: Colors.textColor,
		fontSize: 16,
	},
	titleText: {
		color: Colors.textColor,
		fontSize: 20,
		textAlign: "center",
	},
});

export default CartItem;
