import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../utils/styles";
const SingleVeggie = (props) => {
	const { element } = props;
	const [imageUrl, setImageUrl] = useState();
	const plants = useSelector((state) => state.plants);
	const pressHandler = (element) => {
		props.pressElementHandler(element);
	};

	useEffect(() => {
		if (plants) {
			if (plants[element.id]) {
				setImageUrl(
					`https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${
						plants[element.id].imageId
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
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.cardContent}
				onPress={pressHandler.bind(this, element)}
			>
				<Image
					style={styles.tinyImage}
					source={{
						uri: imageUrl,
					}}
				/>
				<Text style={styles.text}>{element.name}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		elevation: 5,
		padding: 10,
		marginVertical: 12,
		width: "90%",
	},
	cardContent: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	text: {
		color: Colors.textColor,
		fontSize: 14,
	},
	tinyImage: {
		width: 50,
		height: 50,
	},
});

export default SingleVeggie;
