import React, { useEffect, useState } from "react";
import Colors from "../utils/styles";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "../components/customButtons/CustomButton";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { isValidEmail } from "../utils/helper";
import { log_in } from "../Store/Actions/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableOpacity,
	Keyboard,
} from "react-native";

const LogIn = (props) => {
	const { navigation } = props;
	const [isOffline, setOfflineStatus] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [errorMessage, setErrorMessage] = useState("");
	const dispatch = useDispatch();

	const navigateToSignUpHandler = () => {
		navigation.navigate("signUp");
	};

	const changedEmailHandler = (text) => {
		setEmail(text);
	};

	const changePasswordHandler = (text) => {
		setPassword(text);
	};

	const logInHandler = async () => {
		Keyboard.dismiss();
		// Validation
		if (!password || !email) {
			setErrorMessage("Please fill all fields");
			return;
		} else if (!isValidEmail(email)) {
			setErrorMessage("Please enter a valid email");
			return;
		}

		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLTrlLmj_dFKOPI74doQ2rzuWimkIwLcA",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		const resData = await response.json();
		if (!resData.registered) {
			setErrorMessage("Please Sign Up");
		} else {
			dispatch(
				log_in({ userId: resData.email, firebaseUserId: resData.localId })
			);
		}
	};

	useEffect(() => {
		// Check the network connection
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setOfflineStatus(offline);
		});
		return () => removeNetInfoSubscription();
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
								onChangeText={changedEmailHandler}
								defaultValue={email}
							></TextInput>
						</View>
						<View style={styles.inpuContainer}>
							<Text style={styles.text}>Password</Text>
							<TextInput
								secureTextEntry={true}
								style={styles.input}
								onChangeText={changePasswordHandler}
								defaultValue={password}
							></TextInput>
							{errorMessage ? (
								<Text style={styles.validateFieldsText}>{errorMessage}</Text>
							) : null}
						</View>
					</View>
					<TouchableOpacity
						style={styles.signUpContainer}
						onPress={navigateToSignUpHandler}
					>
						<Text style={styles.signUpPrimaryText}>New user? Tap to </Text>
						<Text style={styles.signUpSecondaryText}>sign up</Text>
					</TouchableOpacity>
					<View style={styles.buttonContainer}>
						<CustomButton
							title='Log In'
							pressHandler={logInHandler}
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
		flex: 2,
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
	signUpPrimaryText: {
		color: Colors.textColor,
		fontSize: 18,
	},
	signUpSecondaryText: {
		color: Colors.accent,
		fontSize: 18,
	},
	signUpContainer: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	validateFieldsText: {
		color: "red",
		marginVertical: 8,
	},
});

export default LogIn;
