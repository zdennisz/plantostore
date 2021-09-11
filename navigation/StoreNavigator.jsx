import React from "react";
import Farms from "../Screens/Farms";
import Farm from "../Screens/Farm";
import Store from "../Screens/Store";
import Cart from "../Screens/Cart";
import VeggieDesc from "../Screens/VeggieDesc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StoreScreenStack = createNativeStackNavigator();

const StoreNavigator = () => {
	return (
		<StoreScreenStack.Navigator>
			<StoreScreenStack.Screen
				name='farms'
				component={Farms}
				options={{ title: "My Farms" }}
			/>
			<StoreScreenStack.Screen
				name='farm'
				component={Farm}
				options={{ title: "Farm" }}
			/>
			<StoreScreenStack.Screen
				name='store'
				component={Store}
				options={{ title: "Store" }}
			/>
			<StoreScreenStack.Screen
				name='cart'
				component={Cart}
				options={{ title: "Cart" }}
			/>
			<StoreScreenStack.Screen
				name='veggieDsec'
				component={VeggieDesc}
				options={{ title: "Plant" }}
			/>
		</StoreScreenStack.Navigator>
	);
};

export default StoreNavigator;
