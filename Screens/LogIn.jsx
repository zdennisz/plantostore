import React, { useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogIn = (props) => {
	const { navigation } = props;

	const getData = async () => {
		try {
			const res = await AsyncStorage.getItem("restorePath");
			const parRes = JSON.parse(res);
			return parRes;
		} catch (err) {
			console.log(err);
		}
	};
	//TODO - restore the user path using the async call and the array of the path
	const pressHandler = () => {
		getData()
			.then((succ) => {
				if (succ) {
					console.log(succ);
					navigation.navigate("farms");
				} else {
					navigation.navigate("farms");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {}, []);
	return (
		<View style={stlyes.container}>
			<Button title='Log In' onPress={pressHandler}></Button>
		</View>
	);
};

const stlyes = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LogIn;
