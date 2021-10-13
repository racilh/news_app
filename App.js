import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from "./src/screens/pages/HomeTab";
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import SettingsScreen from "./src/screens/pages/SettingsScreen";
import 'react-native-gesture-handler';
import NewsDetail from "./src/screens/pages/NewsDetail";
const Stack = createStackNavigator();
import SourceNews from "./src/screens/sources/SourceNews";

export default function App() {

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