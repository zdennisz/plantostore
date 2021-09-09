import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../utils/styles";
import SingleVeggie from "./SingleVeggie";
const Card = (props) => {
	const { itemData } = props;

	const pressHandler = (element) => {
		props.getVeggieDesc(element.id);
	};
	return (
		<View style={styles.cardContainer}>
			<Text style={styles.titleText}>{itemData.item.name}</Text>
			<View style={styles.cardContentContainer}>
				{itemData.item.plants.map((element, index) => {
					return (
						<SingleVeggie
							key={index.toString()}
							pressElementHandler={pressHandler}
							element={element}
						/>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContentContainer: {
		flex: 4,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 40,
	},
	cardContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		elevation: 10,
	},
	titleText: {
		position: "absolute",
		top: 5,
		left: 0,
		color: "white",
		fontSize: 24,
		paddingStart: 20,
	},
});

export default Card;
