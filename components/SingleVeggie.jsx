import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../utils/styles";
const SingleVeggie = (props) => {
	const { element } = props;

	const pressHandler = (element) => {
		props.pressElementHandler(element);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.cardContent}
				onPress={pressHandler.bind(this, element)}
			>
				<Text>Some Image</Text>
				<Text style={styles.text}>{element.name}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		elevation: 5,
		padding: 10,
		marginVertical: 12,
		width: "90%",
	},
	cardContent: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	text: {
		color: Colors.textColor,
		fontSize: 14,
	},
});

export default SingleVeggie;
