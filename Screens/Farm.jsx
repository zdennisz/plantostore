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

	// Here we try to sync data from two sources to get the latest data available
	const loadFarmVeggiesFromRemoteDb = async (dispatch, getState) => {
		try {
			const networkRes = await loadExternalStorageData(
				user.firebaseUserId,
				farmId
			);
			const res = await AsyncStorage.getItem(`${farmId}farmVeggiesStoreData`);
			const transformedFarmVeggiesStoreData = JSON.parse(res);
			if (networkRes.data && isOnline) {
				if (
					networkRes.data.timeStamp < transformedFarmVeggiesStoreData.timeStamp
				) {
					// Save the local data to remote db and show the local db
					dispatch(
						restore_farm_veggie({
							farmId: farmId,
							cartItems: transformedFarmVeggiesStoreData.farmVeggies,
							timeStamp: transformedFarmVeggiesStoreData.timeStamp,
						})
					);
					const farm = getState().cart[farmId];
					saveExternalStorageData(farm, farmId, user.firebaseUserId);
				} else {
					// Update the local db according to remote db
					dispatch(
						restore_farm_veggie({
							farmId: farmId,
							cartItems: networkRes.data.farmVeggies,
							timeStamp: networkRes.data.timeStamp,
						})
					);
					const farm = getState().cart[farmId];
					saveLocalStorageData(`${farmId}farmVeggiesStoreData`, farm);
				}
			} else if (networkRes.data === null && isOnline) {
				// Remote db is out of date, Update the remote db according to local db
				dispatch(
					restore_farm_veggie({
						farmId: farmId,
						cartItems: transformedFarmVeggiesStoreData.farmVeggies,
						timeStamp: transformedFarmVeggiesStoreData.timeStamp,
					})
				);
				const farm = getState().cart[farmId];
				saveExternalStorageData(farm, farmId, user.firebaseUserId);
			} else if (networkRes.data === null && !isOnline) {
				// We weren't able to get data from remote db thus load from local db

				dispatch(
					restore_farm_veggie({
						farmId: farmId,
						cartItems: transformedFarmVeggiesStoreData.farmVeggies,
						timeStamp: transformedFarmVeggiesStoreData.timeStamp,
					})
				);
			}
		} catch (err) {
			console.error(err);
		}
		setIsLoading(false);
	};

	const getFarmVeggiesData = (dispatch, getState) => {
		// Display farm veggies orders from DB if online, else from local storage
		if (isOnline) {
			loadFarmVeggiesFromRemoteDb(dispatch, getState);
		} else {
			// Display veggies from local db since we are not online
			AsyncStorage.getItem(`${farmId}farmVeggiesStoreData`)
				.then((farmVeggiesStoreData) => {
					const parsedData = JSON.parse(farmVeggiesStoreData);
					if (parsedData) {
						dispatch(
							restore_farm_veggie({
								farmId: farmId,
								cartItems: parsedData.farmVeggies,
								timeStamp: parsedData.timeStamp,
							})
						);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

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
