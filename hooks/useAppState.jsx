import React, { useEffect } from "react";
import { AppState } from "react-native";

const useAppState = (props) => {
	useEffect(() => {
		const handleAppStateChange = () => {
			props.handleStateChange();
		};

		AppState.addEventListener("change", handleAppStateChange);

		//handleAppStateChange();

		return () => {
			AppState.removeEventListener("change", handleAppStateChange);
		};
	}, []);
};

export default useAppState;
