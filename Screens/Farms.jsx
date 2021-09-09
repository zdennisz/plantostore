import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import Colors from "../utils/styles";

const Farms = (props) => {
	//const [appState, setAppState] = useState(AppState.currentState);
	const { navigation } = props;
	const goToFarmAhandler = () => {
		navigation.navigate("farm", {
			farm: "farmA",
		});
	};

	const goToFarmBhandler = () => {
		navigation.navigate("farm", {
			farm: "farmB",
		});
	};

	return (
		<View style={stlyes.container}>
			<View stlye={stlyes.textContainer}>
				<Text style={stlyes.text}>Select your farm:</Text>
			</View>
			<View style={stlyes.buttonsContainer}>
				<View style={stlyes.buttonContainer}>
					<CustomButton title='FARM A' pressHandler={goToFarmAhandler} />
				</View>
				<View style={stlyes.buttonContainer}>
					<CustomButton title='FARM B' pressHandler={goToFarmBhandler} />
				</View>
			</View>
		</View>
	);
};

const stlyes = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		maxHeight: 350,
	},
	buttonContainer: {
		height: 68,
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
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",

		maxHeight: 250,
	},
});

export default Farms;
