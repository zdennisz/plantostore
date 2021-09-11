import React, { useState, useEffect } from "react";
import Colors from "../utils/styles";
import CustomButton from "../components/customButtons/CustomButton";
import CustomHeaderButton from "../components/customButtons/CustomHeaderButtons";
import { add_to_cart } from "../Store/Actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { saveLocalStorageData, saveExternalStorageData } from "../utils/helper";

const VeggieDesc = (props) => {
	const { route, navigation } = props;
	const { id } = route.params;
	const [farmType] = useState(route.params.cart);
	const veggieInfo = useSelector((state) => state.plants[id]);
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const saveCurrFarmCart = (dispatch, getState) => {
		dispatch(
			add_to_cart({
				id: id,
				name: veggieInfo.name,
				cart: route.params.cart,
			})
		);
		const farm =
			farmType === "farmA" ? getState().cart.farmA : getState().cart.farmB;

		saveLocalStorageData(`${farmType}storeData`, farm);
		saveExternalStorageData(farm, farmType, user.firebaseUserId);
	};

	const addVeggieToCart = () => {
		dispatch(saveCurrFarmCart);
	};

	const goToCart = () => {
		navigation.navigate("cart", {
			cart: `${route.params.cart}`,
		});
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
					<Item
						title='Cart'
						iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
						onPress={goToCart}
					/>
				</HeaderButtons>
			),
		});
	}, []);

	return (
		<>
			{veggieInfo ? (
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={styles.scrollView}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.titleContainer}>
							<Image
								style={styles.regularImage}
								source={{
									uri: `https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${veggieInfo.imageId}@3x.jpg`,
								}}
							/>
							<Text style={styles.titleText}>{veggieInfo.name}</Text>
						</View>
						<View style={styles.detailsContainer}>
							<Text style={styles.descText}>{veggieInfo.description}</Text>
							<View style={styles.detailWrapper}>
								<Text style={styles.detailTitle}>Life Cycle:</Text>
								<Text style={styles.text}> {veggieInfo.lifeCycle}</Text>
							</View>
							<View style={styles.detailWrapper}>
								<Text style={styles.detailTitle}>Yield:</Text>
								<Text style={styles.text}> {veggieInfo.yield}</Text>
							</View>
							<View style={styles.detailWrapper}>
								<Text style={styles.detailTitle}>Seed to crop:</Text>
								<Text style={styles.text}> {veggieInfo.seedToCrop}</Text>
							</View>
						</View>
						<View style={styles.detailsContainer}>
							<Text style={styles.detailTitle}>Nutritional Facts: </Text>
							<Text style={styles.text}>
								{veggieInfo.nutritionFacts.portionInfo}
							</Text>
						</View>
						<View style={styles.tableContainer}>
							<View style={styles.tableRowTitleContainer}>
								<Text style={styles.tableRowTitle}>Nutrients</Text>
								<Text style={styles.tableRowTitle}>Amount</Text>
								<Text style={styles.tableRowTitle}>RDA (%)</Text>
							</View>
							{veggieInfo.nutritionFacts.items.map((item, index) => {
								return (
									<View key={index.toString()} style={styles.rowContainer}>
										<Text style={styles.rowTitleContent}>{item.key}</Text>
										<Text style={styles.rowContent}>{item.nutrientValue}</Text>
										<Text style={styles.rowContent}>
											{item.percentageOfRDA}
										</Text>
									</View>
								);
							})}
						</View>
					</ScrollView>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='Add to Cart'
							pressHandler={addVeggieToCart}
							isImage={false}
							customStyle={{ width: "150%" }}
						/>
					</View>
				</View>
			) : (
				<View style={styles.container}>
					<Image
						style={styles.regularImage}
						source={{
							uri: "https://media.istockphoto.com/vectors/beetle-under-magnifying-glass-on-leaf-solid-icon-allergy-concept-vector-id1263496173?k=20&m=1263496173&s=612x612&w=0&h=C_5Lpzh4p-HuXrzI9tgAXvZcaFb6iy157QKF0OaHuBI=",
						}}
					/>
					<Text style={styles.errorText}>Sorry, plant not found :( </Text>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 4,
		width: "90%",
		borderTopWidth: 2,
		borderColor: Colors.secondary,
	},
	tableRowTitleContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 4,
		width: "90%",

		backgroundColor: Colors.secondary,
	},
	tableContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 80,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
		height: 50,
		width: 350,
	},
	regularImage: {
		width: 150,
		height: 150,
	},
	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
	},
	titleText: {
		fontSize: 32,
		color: Colors.textColor,
		textAlign: "center",
	},
	errorText: {
		fontSize: 20,
		color: Colors.textColor,
		textAlign: "center",
	},
	detailsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		width: "90%",
		padding: 12,
	},
	scrollView: {
		justifyContent: "center",
		alignItems: "center",
	},
	descText: {
		marginBottom: 16,
		fontSize: 16,
		color: Colors.textColor,
	},
	detailTitle: {
		fontWeight: "bold",
		fontSize: 16,
		color: Colors.textColor,
	},
	text: {
		fontSize: 16,
		color: Colors.textColor,
	},
	detailWrapper: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginVertical: 2,
	},
	rowContent: {
		width: "33%",
		textAlign: "center",
		color: Colors.textColor,
	},
	rowTitleContent: {
		width: "33%",
		textAlign: "center",
		fontWeight: "bold",
		color: Colors.textColor,
	},
	tableRowTitle: {
		width: "33%",
		textAlign: "center",
		color: "white",
	},
});

export default VeggieDesc;
