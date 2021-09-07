import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Card from "./Card";

const GroupedVeggies = (props) => {
	const categories = useSelector((state) => state.categories.allCategories);

	const getVeggieDesc = (elementId) => {
		props.showVeggieDesc(elementId);
	};
	return (
		<View style={styles.flatListContainer}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={categories}
				keyExtractor={(item, index) => index.toString()}
				renderItem={(itemData) => (
					<Card itemData={itemData} getVeggieDesc={getVeggieDesc} />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		flexWrap: "wrap",
	},
	flatListContainer: {
		width: "80%",
		marginVertical: 10,
	},
});

export default GroupedVeggies;
