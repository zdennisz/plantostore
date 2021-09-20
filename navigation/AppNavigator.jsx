import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import useIsOnline from "../hooks/useIsOnline";
import StoreNavigator from "./StoreNavigator";
import AuthNavigator from "./AuthNavigator";
import { online_status } from "../Store/Actions/auth";

const AppNavigator = (props) => {
	const isAuth = useSelector((state) => !!state.auth.userId);
	const isOnline = useIsOnline();
	const dispatch = useDispatch();
	useEffect(() => {
		if (isOnline != undefined) {
			console.log("online status ", isOnline);
			dispatch(online_status({ onlineStatus: isOnline }));
		}
	}, [isOnline]);

	return (
		<NavigationContainer>
			{isAuth ? <StoreNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
