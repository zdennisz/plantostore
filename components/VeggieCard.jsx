import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../utils/styles";
import { useSelector } from "react-redux";
import CustomRoundButton from "./CustomRoundButton";

const VeggieCard = (props) => {
	const { veggie, isDisplayAmount = false, isAmountEditable = false } = props;
	const [imageUrl, setImageUrl] = useState();
	const plants = useSelector((state) => state.plants);

	const addCartItem = () => {
		props.incCartItem(veggie.id);
	};

	const pressHandler = (veggie) => {
		props.pressVeggieHandler(veggie);
	};
	const decCartItem = () => {
		props.decCartItem(veggie.id);
	};
	useEffect(() => {
		if (plants) {
			if (plants[veggie.id]) {
				setImageUrl(
					`https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${
						plants[veggie.id].imageId
					}@3x.jpg`
				);
			} else {
				setImageUrl(
					"https://media.istockphoto.com/vectors/beetle-under-magnifying-glass-on-leaf-solid-icon-allergy-concept-vector-id1263496173?k=20&m=1263496173&s=612x612&w=0&h=C_5Lpzh4p-HuXrzI9tgAXvZcaFb6iy157QKF0OaHuBI="
				);
			}
		}
	}, [plants]);

	return (
		<View style={styles.veggieCardContainer}>
			{!isDisplayAmount ? (
				<TouchableOpacity
					style={styles.cardContent}
					onPress={pressHandler.bind(this, veggie)}
				>
					<Image
						style={styles.tinyImage}
						source={{
							uri: imageUrl,
						}}
					/>
					<Text style={styles.text}>{veggie.name}</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.cardContent}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.tinyImage}
							source={{
								uri: imageUrl,
							}}
						/>
					</View>
					<View style={styles.nameContainer}>
						<Text style={styles.titleText}>{veggie.name}</Text>
					</View>
					<View style={styles.buttonsContainer}>
						{isAmountEditable ? (
							<>
								<CustomRoundButton title='+' pressHandler={addCartItem} />
								<Text style={styles.text}>{veggie.amount}</Text>
								<CustomRoundButton title='-' pressHandler={decCartItem} />
							</>
						) : (
							<Text style={styles.text}>{veggie.amount}</Text>
						)}
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	veggieCardContainer: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
		marginVertical: 16,
		borderWidth: 2,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 16,
		backgroundColor: "white",
		borderColor: Colors.secondary,
		elevation: 5,
		alignSelf: "center",
	},
	cardContent: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		paddingTop: 16,
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	text: {
		color: Colors.textColor,
		fontSize: 16,
	},
	titleText: {
		color: Colors.textColor,
		fontSize: 20,
		textAlign: "center",
	},
	tinyImage: {
		width: 80,
		height: 80,
	},
});

export default VeggieCard;
