import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useAppState from "../hooks/useAppState";
import StoreNavigator from "./StoreNavigator";
import AuthNavigator from "./AuthNavigator";

const AppNavigator = (props) => {
	const isAuth = useSelector((state) => !!state.auth.userId);
	const [historyPath, setHistoryPath] = useState([]);
	useAppState(historyPath);

	const getCurrentRoute = (state) => {
		if (state.index === undefined || state.index < 0) {
			return undefined;
		}

		const nestedState = state.routes[state.index].state;
		if (nestedState !== undefined) {
			return getCurrentRoute(nestedState);
		}

		setHistoryPath((historyPath) => {
			let path;
			switch (state.routes[state.index].name) {
				case "logIn":
					return [...historyPath, state.routes[state.index].name];
				case "farms":
					return [...historyPath, state.routes[state.index].name];
				case "farm":
					return [...historyPath, state.routes[state.index].params.farm];
				case "store":
					path = "store" + state.routes[state.index].params.cart.slice(-1);
					return [...historyPath, path];
				case "cart":
					path = "cart" + state.routes[state.index].params.cart.slice(-1);
					return [...historyPath, path];
				case "veggieDsec":
					path =
						state.routes[state.index].params.cart +
						" " +
						state.routes[state.index].params.id;
					return [...historyPath, path];
			}
		});
	};

	return (
		<NavigationContainer>
			{isAuth ? <StoreNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
