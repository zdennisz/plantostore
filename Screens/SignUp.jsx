import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/styles";
import CustomButton from "../components/customButtons/CustomButton";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const SignUp = (props) => {
	const { navigation } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState();
	const dispatch = useDispatch();
	const [isOffline, setOfflineStatus] = useState(false);
	const getData = async () => {
		try {
			const res = await AsyncStorage.getItem("restorePath");
			const parRes = JSON.parse(res);
			return parRes;
		} catch (err) {
			console.log(err);
		}
	};
	const changeEmailHandler = (text) => {
		setEmail(text);
	};

	const changePasswordHandler = (text) => {
		setPassword(text);
	};

	const changeConfirmPasswordHandler = (text) => {
		setConfirmPassword(text);
	};

	const signUpHandler = () => {
		if (!password && !confirmPassword && !email) {
			setErrorMessage("Please fill all fields");
		} else if (password != confirmPassword) {
			setErrorMessage("Passwords do not match");
		} else if (password && password.length < 6) {
			setErrorMessage("Password must be at least 6 characters");
		} else if (!isValidEmail(email)) {
			setErrorMessage("Please enter a valid email");
		} else if (password && confirmPassword && email) {
			setErrorMessage("");
			dispatch(signUpToStore);
		}
	};

	const isValidEmail = (email) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		return reg.test(email);
	};
	const signUpToStore = async (dispatch, getState) => {
		//Send registration data to firebase authentication
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLTrlLmj_dFKOPI74doQ2rzuWimkIwLcA",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: userName,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		const resData = await response.json();
		console.log(resData);
	};

	useEffect(() => {
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setOfflineStatus(offline);
		});
		return () => {
			removeNetInfoSubscription();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{isOffline ? (
				<View style={styles.notFoundContainer}>
					<Ionicons
						name='leaf'
						size={80}
						style={styles.image}
						color={Colors.primary}
					/>
					<View style={styles.notFoundTextContainer}>
						<Text style={styles.notFoundText}>
							Internet connection was not found.
						</Text>
						<Text style={styles.notFoundText}>Please turn it on :)</Text>
					</View>
				</View>
			) : (
				<>
					<View style={styles.imageContainer}>
						<Ionicons name='leaf' size={70} style={styles.image} />
					</View>
					<View style={styles.textContainers}>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Email</Text>
							<TextInput
								style={styles.input}
								onChangeText={changeEmailHandler}
								defaultValue={email}
							></TextInput>
						</View>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Password</Text>
							<TextInput
								style={styles.input}
								onChangeText={changePasswordHandler}
								defaultValue={password}
							></TextInput>
						</View>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Confirm Password</Text>
							<TextInput
								style={styles.input}
								onChangeText={changeConfirmPasswordHandler}
								defaultValue={confirmPassword}
							></TextInput>
						</View>
						{errorMessage ? (
							<Text style={styles.validateFieldsText}>{errorMessage}</Text>
						) : null}
					</View>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='Sign Up'
							pressHandler={signUpHandler}
							customStyle={{ width: "150%" }}
						/>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	image: {
		color: Colors.primary,
	},
	text: {
		marginVertical: 5,
		color: Colors.textColor,
		fontSize: 20,
	},
	textContainers: {
		flex: 3,
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inpuContainer: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	input: {
		borderColor: Colors.secondary,
		borderWidth: 2,
		borderRadius: 5,
		width: 250,
		height: 40,
		padding: 2,
		paddingStart: 8,
		fontSize: 20,
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
		textAlign: "center",
	},
	notFoundTextContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	validateFieldsText: {
		color: "red",
		marginVertical: 8,
	},
});

export default SignUp;
