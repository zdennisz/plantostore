import React, { useEffect, useRef, useState } from "react";
import Colors from "../utils/styles";
import VeggieCard from "../components/VeggieCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeaderButton from "../components/customButtons/CustomHeaderButtons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { loadExternalStorageData } from "../utils/helper";
import { restore_farm_veggie } from "../Store/Actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
	StyleSheet,
	View,
	Text,
	Platform,
	FlatList,
	ActivityIndicator,
} from "react-native";
import {
	flatListItemParser,
	saveLocalStorageData,
	saveExternalStorageData,
} from "../utils/helper";
import farmNames from "../utils/farmNames";

const Farm = (props) => {
	const { route, navigation } = props;
	const [farmId] = useState(route.params.farmId);
	const [isLoading, setIsLoading] = useState(true);
	const farmVeggies = useSelector((state) => state.cart[farmId]?.farmVeggies);
	const farm = useSelector((state) => state.cart[farmId]);
	const user = useSelector((state) => state.auth);

	const isOnline = useSelector((state) => state.auth.onlineStatus);
	const dispatch = useDispatch();

	const farmVeggiesArray = farmVeggies ? flatListItemParser(farmVeggies) : [];

	const goToCart = () => {
		navigation.navigate("cart", {
			farmId: farmId,
		});
	};

	const goToStore = () => {
		navigation.navigate("store", {
			farmId: farmId,
		});
	};

	const goToVeggieDesc = (veggie) => {
		navigation.navigate("veggieDsec", {
			id: veggie.id,
			farmId: farmId,
		});
	};

	const loadFarmVeggies = async (dispatch, getState) => {
		const farm = getState().cart[farmId];
		try {
			const res = await loadExternalStorageData(user.firebaseUserId, farmId);
			if (res.data) {
				dispatch(restore_farm_veggie({ farmId: farmId, cartItems: res.data }));
				saveLocalStorageData(`${farmId}farmVeggiesStoreData`, farm);
			}
			setIsLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	const getFarmVeggiesData = (dispatch, getState) => {
		// Display farm veggies orders from DB if online, else from local storage
		if (isOnline) {
			loadFarmVeggies(dispatch, getState);
		} else {
			AsyncStorage.getItem(`${farmId}farmVeggiesStoreData`)
				.then((farmVeggiesStoreData) => {
					const parsedData = JSON.parse(farmVeggiesStoreData);
					if (parsedData) {
						dispatch(
							restore_farm_veggie({ farmId: farmId, cartItems: parsedData })
						);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
	//sync the local data with the remote db data
	// useEffect(() => {
	// 	if (isOnline && isLoading === false) {
	// 		saveExternalStorageData(farm, farmId, user.firebaseUserId);
	// 	}
	// }, [isOnline, isLoading]);

	useEffect(() => {
		navigation.setOptions({
			title: farmNames[farmId],
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title='Cart'
						iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
						onPress={goToCart}
					/>
					<Item
						title='Store'
						iconName={
							Platform.OS === "android"
								? "md-add-circle-sharp"
								: "ios-add-sharp"
						}
						onPress={goToStore}
					/>
				</HeaderButtons>
			),
		});
		dispatch(getFarmVeggiesData);
	}, []);

	return (
		<View style={styles.container}>
			{farmVeggiesArray.length > 0 ? (
				<>
					<View style={styles.textContainer}>
						<Text style={styles.text}>Veggies in your farm:</Text>
					</View>
					<View style={styles.flatListContainer}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={farmVeggiesArray}
							keyExtractor={(veggie) => veggie.id}
							renderItem={(veggieContainer) => (
								<VeggieCard
									veggie={veggieContainer.item}
									isDisplayAmount={true}
									isAmountEditable={false}
									pressVeggieHandler={goToVeggieDesc}
								/>
							)}
						/>
					</View>
				</>
			) : (
				<>
					{isLoading ? (
						<ActivityIndicator
							style={styles.loader}
							size='large'
							color={Colors.primary}
						/>
					) : (
						<View style={styles.notFoundContainer}>
							<Ionicons
								name='leaf'
								size={80}
								style={styles.image}
								color={Colors.primary}
							/>
							<Text style={styles.notFoundText}>
								Didn't find any veggies in your farm :(
							</Text>
						</View>
					)}
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "white",
	},
	textContainer: {
		height: "8%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		width: "100%",
	},
	text: {
		marginVertical: 10,
		fontSize: 23,
		color: "white",
	},
	flatListContainer: {
		width: "80%",
		height: "92%",
	},
	notFoundContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
	},
	notFoundText: {
		color: Colors.textColor,
		fontSize: 20,
		marginTop: 24,
		textAlign: "center",
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Farm;
