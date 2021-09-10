import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../utils/styles";
import { useSelector } from "react-redux";
import CustomRoundButton from "./customButtons/CustomRoundButton";

const VeggieCard = (props) => {
	const { veggie, isDisplayAmount = false, isAmountEditable = false } = props;
	const [imageUrl, setImageUrl] = useState();
	const plants = useSelector((state) => state.plants);

	const incCartItem = () => {
		props.incCartItemHandler(veggie.id);
	};

	const decCartItem = () => {
		props.decCartItemHandler(veggie.id);
	};

	const navToVeggieDesc = (veggie) => {
		props.pressVeggieHandler(veggie);
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
			<TouchableOpacity
				style={styles.cardContent}
				onPress={navToVeggieDesc.bind(this, veggie)}
			>
				<Image
					style={styles.tinyImage}
					source={{
						uri: imageUrl,
					}}
				/>
				<Text style={styles.titleText}>{veggie.name}</Text>
			</TouchableOpacity>
			<View style={styles.cardContent}>
				{isDisplayAmount && (
					<View style={styles.amountContainer}>
						{isAmountEditable ? (
							<>
								<CustomRoundButton title='+' pressHandler={incCartItem} />
								<Text style={styles.amountText}>{veggie.amount}</Text>
								<CustomRoundButton title='-' pressHandler={decCartItem} />
							</>
						) : (
							<Text style={styles.text}>Quantity: {veggie.amount}</Text>
						)}
					</View>
				)}
			</View>
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
		backgroundColor: "white",
		borderColor: Colors.secondary,
		elevation: 5,
		alignSelf: "center",
	},
	cardContent: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		height: "100%",
		marginHorizontal: 12,
		marginVertical: 16,
	},
	amountContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
	text: {
		color: Colors.textColor,
		fontSize: 16,
	},
	amountText: {
		color: Colors.textColor,
		fontSize: 16,
		width: 28,
		textAlign: "center",
	},
});

export default VeggieCard;
