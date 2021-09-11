import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Category from "./Category";

const CategoryList = (props) => {
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
					<Category itemData={itemData} getVeggieDesc={getVeggieDesc} />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flatListContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CategoryList;
