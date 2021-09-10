import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../utils/styles";

const CustomButton = (props) => {
	const onPressHandler = () => {
		props.pressHandler();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.btnContainer} onPress={onPressHandler}>
				<View style={styles.contentContainer}>
					<Text style={styles.text}>{props.title}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	btnContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 36,
		width: 36,
		backgroundColor: Colors.accent,
		borderRadius: 25,
		elevation: 5,
	},
	text: {
		color: "white",
		fontSize: 28,
	},
	image: {
		color: "white",
	},
	contentContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
});

export default CustomButton;
