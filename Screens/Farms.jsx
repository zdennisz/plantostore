import React from "react";
import { StyleSheet, View, Button, AppState } from "react-native";
import { useState } from "react";

const Farms = (props) => {
	const [appState, setAppState] = useState(AppState.currentState);
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
			<Button title='Farm A' onPress={goToFarmAhandler}></Button>
			<Button title='Farm B' onPress={goToFarmBhandler}></Button>
		</View>
	);
};

const stlyes = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
});

export default Farms;
