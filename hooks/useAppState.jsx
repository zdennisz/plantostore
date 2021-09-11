import React, { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAppState = (props) => {
	const [path, setPath] = useState(props);
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	const saveData = async (path) => {
		try {
			const data = JSON.stringify(path);

			await AsyncStorage.setItem("restorePath", data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAppStateChange = (nextAppState) => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === "active"
		) {
		}

		if (nextAppState === "background" || nextAppState === "inactive") {
			saveData(path);
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		if (appState.current === "background") {
		}
	};

	useEffect(() => {
		AppState.addEventListener("change", handleAppStateChange);
		setPath(props);

		return () => {
			AppState.removeEventListener("change", handleAppStateChange);
		};
	}, [props, path]);
};

export default useAppState;
