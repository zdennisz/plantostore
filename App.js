import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import categoriesReducer from './Store/Reducers/categories';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from './Screens/LogIn';
import Farms from './Screens/Farms'
import Farm from './Screens/Farm'
import Store from './Screens/Store'
import Cart from './Screens/Cart'
import VeggieDesc from './Screens/VeggieDesc'
import cartReducer from './Store/Reducers/cart';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer
})

const store = createStore(rootReducer)

const Stack = createNativeStackNavigator()

//this func help identify the screen we are at, we can save the path in the redux and save via async storage and get it on app load and navigate to it
// export const getCurrentRoute = (state) => {
//   if (state.index === undefined || state.index < 0) {
//     return undefined;
//   }
//   const nestedState = state.routes[state.index].state;
//   if (nestedState !== undefined) {
//     return getCurrentRoute(nestedState);
//   }
//   //console.log("state.routes[state.index].name", state.routes[state.index])
//   return console.log(state.routes[state.index].name);
// };
//   <NavigationContainer onStateChange={getCurrentRoute}>


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='logIn'
            component={LogIn}
            options={{ title: "Agwa HW" }} />
          <Stack.Screen
            name='farms'
            component={Farms}
            options={{ title: "My Farms" }} />
          <Stack.Screen
            name='farm'
            component={Farm}
            options={{ title: "Farm" }} />
          <Stack.Screen
            name='store'
            component={Store}
            options={{ title: "Store" }} />
          <Stack.Screen
            name='cart'
            component={Cart}
            options={{ title: "Cart" }} />
          <Stack.Screen
            name='veggieDsec'
            component={VeggieDesc}
            options={{ title: "Veggie Desc" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
