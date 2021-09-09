import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/styles";

const CustomButton = (props) => {
	const onPressHandler = () => {
		props.pressHandler();
	};
	//TODO merge the custom round button with custom button
	return (
		<View>
			<TouchableOpacity style={styles.container} onPress={onPressHandler}>
				<View style={styles.contentContainer}>
					{props.isImage ? (
						<Ionicons name='leaf' size={35} style={styles.image} />
					) : null}
					<Text style={styles.text}>{props.title}</Text>
				</View>
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
		height: 36,
		width: 36,
		backgroundColor: Colors.accent,
		borderRadius: 25,
		elevation: 5,
	},
	text: {
		color: "white",
		fontSize: 24,
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
