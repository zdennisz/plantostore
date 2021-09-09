import { StyleSheet, View } from "react-native";
import React from "react";
import GroupedVeggies from "../components/GroupedVeggies";
import Colors from "../utils/styles";

const Store = (props) => {
	const { route, navigation } = props;

	const showVeggieDesc = (elementId) => {
		navigation.navigate("veggieDsec", {
			id: elementId,
			cart: route.params.cart,
		});
	};

	// useEffect(() => {
	// 	const getCategories = async () => {
	// 		try {
	// 			const res = await axios.get(`${REACT_APP_AGWA_CATEGORIES}`);

	// 			dispatch(add_categories(res.data.categories));
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	getCategories();
	// }, []);

	// useEffect(() => {
	// 	const getPlantData = async () => {
	// 		try {
	// 			const allPlantData = await axios.get(`${REACT_APP_AGWA_PLANTS}`);

	// 			let dataToStore = {};

	// 			for (let i = 0; i < categories.length; i++) {
	// 				let plantsArray = categories[i].plants;

	// 				for (let j = 0; j < plantsArray.length; j++) {
	// 					const foundPlant = allPlantData.data.plants.find(
	// 						(item) => item.id === plantsArray[j].id
	// 					);
	// 					if (foundPlant) {
	// 						dataToStore[plantsArray[j].id] = foundPlant;
	// 					}
	// 				}
	// 			}
	// 			dispatch(add_plants(dataToStore));
	// 			setIsLoading(false);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	if (categories) {
	// 		getPlantData();
	// 	}
	// }, [categories]);

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
