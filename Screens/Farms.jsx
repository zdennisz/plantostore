import React, { useEffect, useState } from "react";
import axios from "axios";
import Colors from "../utils/styles";
import CustomButton from "../components/customButtons/CustomButton";
import CustomHeaderButton from "../components/customButtons/CustomHeaderButtons";
import { log_out } from "../Store/Actions/auth";
import { add_veggies } from "../Store/Actions/veggies";
import { useDispatch, useSelector } from "react-redux";
import { add_categories } from "../Store/Actions/categories";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { REACT_APP_CATEGORIES, REACT_APP_VEGGIES } from "../utils/database";
import farmNames from "../utils/farmNames";

const Farms = (props) => {
	const { navigation } = props;
	const [isLoading, setIsLoading] = useState(true);
	const categories = useSelector((state) => state.categories.allCategories);
	const dispatch = useDispatch();

	const goToFarmAHandler = () => {
		navigation.navigate("farm", {
			farmId: "F0",
		});
	};

	const goToFarmBHandler = () => {
		navigation.navigate("farm", {
			farmId: "F1",
		});
	};

	const logOutHandler = () => {
		dispatch(log_out());
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title='Logout'
						iconName={Platform.OS === "android" ? "md-exit" : "ios-exit"}
						onPress={logOutHandler}
					/>
				</HeaderButtons>
			),
		});
	}, []);

	useEffect(() => {
		//Gets the categories from veggie DB
		const getCategories = async () => {
			try {
				const res = await axios.get(`${REACT_APP_CATEGORIES}`);

				dispatch(add_categories(res.data));
			} catch (err) {
				console.error(err);
			}
		};
		getCategories();
	}, []);

	useEffect(() => {
		//Gets all the veggie info of the categories
		const getVeggieData = async () => {
			try {
				const allVeggieData = await axios.get(`${REACT_APP_VEGGIES}`);
				let dataToStore = {};

				for (let i = 0; i < categories.length; i++) {
					let veggiesArray = categories[i].veggies;
					for (let j = 0; j < veggiesArray.length; j++) {
						const foundVeggie = allVeggieData.data.find(
							(veggie) => veggie.id === veggiesArray[j].id
						);
						if (foundVeggie) {
							dataToStore[veggiesArray[j].id] = foundVeggie;
						}
					}
				}
				dispatch(add_veggies(dataToStore));
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		};

		if (categories) {
			getVeggieData();
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
				<>
					<View stlye={styles.textContainer}>
						<Text style={styles.text}>Select your farm:</Text>
					</View>
					<View style={styles.buttonsContainer}>
						<View style={styles.buttonContainer}>
							<CustomButton
								title={farmNames.F0}
								pressHandler={goToFarmAHandler}
								isImage={true}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<CustomButton
								title={farmNames.F1}
								pressHandler={goToFarmBHandler}
								isImage={true}
							/>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "white",
	},
	buttonContainer: {
		height: 68,
		marginVertical: 28,
	},
	text: {
		color: Colors.textColor,
		fontSize: 24,
		marginVertical: 20,
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		height: "10%",
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		height: "90%",
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Farms;
