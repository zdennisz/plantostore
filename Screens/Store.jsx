import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GroupedVeggies from "../components/GroupedVeggies";
import { REACT_APP_AGWA_CATEGORIES, REACT_APP_AGWA_PLANTS } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { add_categories } from "../Store/Actions/categories";
import { add_plants } from "../Store/Actions/plants";
import Colors from "../utils/styles";

const Store = (props) => {
	const { route, navigation } = props;
	const [isLoading, setIsLoading] = useState(true);
	const categories = useSelector((state) => state.categories.allCategories);
	const dispatch = useDispatch();

	const showVeggieDesc = (elementId) => {
		navigation.navigate("veggieDsec", {
			id: elementId,
			cart: route.params.cart,
		});
	};

	useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await axios.get(`${REACT_APP_AGWA_CATEGORIES}`);

				dispatch(add_categories(res.data.categories));
			} catch (err) {
				console.log(err);
			}
		};

		getCategories();
	}, []);

	useEffect(() => {
		const getPlantData = async () => {
			try {
				const allPlantData = await axios.get(`${REACT_APP_AGWA_PLANTS}`);

				let dataToStore = {};

				for (let i = 0; i < categories.length; i++) {
					let plantsArray = categories[i].plants;

					for (let j = 0; j < plantsArray.length; j++) {
						const foundPlant = allPlantData.data.plants.find(
							(item) => item.id === plantsArray[j].id
						);
						if (foundPlant) {
							dataToStore[plantsArray[j].id] = foundPlant;
						}
					}
				}
				dispatch(add_plants(dataToStore));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		if (categories) {
			getPlantData();
		}
	}, [categories]);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator
					style={styles.loader}
					size='large'
					color={Colors.primary}
				/>
			) : (
				<GroupedVeggies showVeggieDesc={showVeggieDesc} />
			)}
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
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Store;
