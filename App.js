import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import categoriesReducer from './Store/Reducers/categories';
import React, { useState } from 'react';
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
import itemIdReducer from './Store/Reducers/itemId'
import plantsReducer from './Store/Reducers/plants';
import reduxMiddelware from './utils/reduxMiddelware'
import useAppState from './hooks/useAppState';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  itemId: itemIdReducer,
  plants: plantsReducer
})

const middlewareEnhancer = applyMiddleware(reduxMiddelware)
const store = createStore(rootReducer, middlewareEnhancer)

const Stack = createNativeStackNavigator()



export default App = () => {
  const [historyPath, setHistoryPath] = useState([])
  useAppState(historyPath)

  const getCurrentRoute = (state) => {
    if (state.index === undefined || state.index < 0) {
      return undefined;
    }

    const nestedState = state.routes[state.index].state;
    if (nestedState !== undefined) {
      return getCurrentRoute(nestedState);
    }

    setHistoryPath(historyPath => {
      let path
      switch (state.routes[state.index].name) {
        case 'logIn':
          return [...historyPath, state.routes[state.index].name]
        case 'farms':
          return [...historyPath, state.routes[state.index].name]
        case 'farm':
          return [...historyPath, state.routes[state.index].params.farm]
        case 'store':
          path = 'store' + state.routes[state.index].params.cart.slice(-1)
          return [...historyPath, path]
        case 'cart':
          path = 'cart' + state.routes[state.index].params.cart.slice(-1)
          return [...historyPath, path]
        case 'veggieDsec':
          path = state.routes[state.index].params.cart + ' ' + state.routes[state.index].params.id
          return [...historyPath, path]
      }

    }
    )

  }

  return (
    <Provider store={store}>
      <NavigationContainer onStateChange={getCurrentRoute} >
        <Stack.Navigator>
          <Stack.Screen
            name='logIn'
            component={LogIn}
            options={{ title: "" }} />
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
