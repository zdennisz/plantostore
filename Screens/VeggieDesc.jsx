import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { add_to_cart } from "../Store/Actions/cart";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../utils/styles";
import CustomButton from "../components/CustomButton";

const VeggieDesc = (props) => {
	const { route } = props;
	const { id } = route.params;
	const [farmType] = useState(route.params.cart);
	const veggieInfo = useSelector((state) => state.plants[id]);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const currFarm = farmType === "farmA" ? cart.farmA : cart.farmB;

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

		try {
			AsyncStorage.setItem(`${farmType}storeData`, JSON.stringify({ ...farm }));
		} catch (err) {
			console.log(err);
		}
	};

	const addVeggieToCart = () => {
		dispatch(saveCurrFarmCart);
	};

	return (
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
						<Text> {veggieInfo.lifeCycle}</Text>
					</View>
					<View style={styles.detailWrapper}>
						<Text style={styles.detailTitle}>Yield:</Text>
						<Text> {veggieInfo.yield}</Text>
					</View>
					<View style={styles.detailWrapper}>
						<Text style={styles.detailTitle}>Seed to crop:</Text>
						<Text> {veggieInfo.seedToCrop}</Text>
					</View>
				</View>
				<View style={styles.detailsContainer}>
					<Text style={styles.detailTitle}>Nutritional Facts: </Text>
					<Text>{veggieInfo.nutritionFacts.portionInfo}</Text>
				</View>
				<View style={styles.tableContainer}>
					{veggieInfo.nutritionFacts.items.map((item, index) => {
						return (
							<View key={index.toString()} style={styles.rowContainer}>
								<Text style={styles.rowTitleContent}>{item.key}</Text>
								<Text style={styles.rowContent}>{item.nutrientValue}</Text>
								<Text style={styles.rowContent}>{item.percentageOfRDA}</Text>
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
	},
	rowTitleContent: {
		width: "33%",
		textAlign: "center",
		fontWeight: "bold",
	},
});

export default VeggieDesc;
