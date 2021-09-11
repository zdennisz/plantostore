import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "../Screens/LogIn";

const AuthScreenStack = createNativeStackNavigator();

const AuthNavigator = (props) => {
	return (
		<AuthScreenStack.Navigator>
			<AuthScreenStack.Screen
				name='logIn'
				component={LogIn}
				options={{ title: "" }}
			/>
		</AuthScreenStack.Navigator>
	);
};

export default AuthNavigator;
