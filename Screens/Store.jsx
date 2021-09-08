import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import GroupedVeggies from "../components/GroupedVeggies";
import { REACT_APP_AGWA_CATEGORIES } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { add_categories } from "../Store/Actions/categories";

const Store = (props) => {
	const { route, navigation } = props;
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

	return (
		<View style={stlyes.container}>
			<GroupedVeggies showVeggieDesc={showVeggieDesc} />
		</View>
	);
};

const stlyes = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
});

export default Store;
