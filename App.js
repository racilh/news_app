import {createStackNavigator} from '@react-navigation/stack';
import HomeTabs from "./src/screens/pages/HomeTab";
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import SettingsScreen from "./src/screens/pages/SettingsScreen";
import 'react-native-gesture-handler';
import NewsDetail from "./src/screens/pages/NewsDetail";
import SourceNews from "./src/screens/sources/SourceNews";
import {bookmarkStore} from "./src/mobx/store";
import {Provider} from "mobx-react";

const Stack = createStackNavigator();


const store=bookmarkStore;

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )

}

function Navigation() {

    return (

        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="News"
                    component={HomeTabs}
                />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
                <Stack.Screen name="NewsDetail" component={NewsDetail}/>
                <Stack.Screen name="SourceNews" component={SourceNews}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}