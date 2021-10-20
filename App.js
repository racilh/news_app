import {createStackNavigator} from '@react-navigation/stack';
import HomeTabs from "./src/screens/pages/HomeTab";
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import SettingsScreen from "./src/screens/pages/SettingsScreen";
import 'react-native-gesture-handler';
import NewsDetail from "./src/screens/pages/NewsDetail";
import SourceNews from "./src/screens/sources/SourceNews";
import {Provider} from "mobx-react";

/**
 * Calling function createStackNavigator to transition between screens where each new screen is placed on top of a stack.
 * Calling class bookmarkStore to have access to it
 **/
const Stack = createStackNavigator();


/**
 * Creating a module that exposes assets to other modules using export
 */
export default () => {

    /**
     * Now that we have access to the store from bookmarkStore, we can use this {@link Provider} to pass down store
     * using React’s context mechanism (share information to any component)
     */
    return (
        <Provider>
            <Navigation/>
        </Provider>
    )

}

/**
 * Create a function to transition between screens {@link HomeTabs}, {@link SettingsScreen}, {@link NewsDetail},
 * {@link SourceNews} with {@link HomeTab} as the root component
 * {@link NavigationContainer} is responsible for managing your app state and linking your top-level navigator to the app environment.
 */
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="News"
                    component={HomeTabs}/>
                <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
                <Stack.Screen name="NewsDetail" component={NewsDetail}/>
                <Stack.Screen name="SourceNews" component={SourceNews}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
