import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../utils/styles";
import { Ionicons } from "@expo/vector-icons";
import VeggieCard from "./VeggieCard";

const Category = (props) => {
	const { itemData } = props;
	const [isCategortOpen, setIscategoryOpen] = useState(false);
	const pressHandler = (veggie) => {
		props.getVeggieDesc(veggie.id);
	};

	const expandCategoryHandler = () => {
		setIscategoryOpen((state) => !state);
	};
	return (
		<View style={styles.cardContainer}>
			<TouchableOpacity
				style={styles.categoryTitleContainer}
				onPress={expandCategoryHandler}
			>
				<Text style={styles.titleText}>{itemData.item.name}</Text>
				<Ionicons
					name={isCategortOpen ? "caret-up-circle" : "caret-down-circle"}
					size={36}
					color='white'
				/>
			</TouchableOpacity>
			{isCategortOpen && (
				<View style={styles.cardContentContainer}>
					{itemData.item.plants.map((veggie) => {
						return (
							<VeggieCard
								key={veggie.id.toString()}
								pressVeggieHandler={pressHandler}
								veggie={veggie}
								isDisplayAmount={false}
							/>
						);
					})}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	cardContentContainer: {
		flex: 4,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	cardContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
		backgroundColor: Colors.primary,
		elevation: 7,
		width: "85%",
	},
	titleText: {
		color: "white",
		fontSize: 24,
	},
	categoryTitleContainer: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		width: "85%",
		marginVertical: 12,
	},
});

export default Category;
