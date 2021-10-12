import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from "./src/screens/pages/HomeTab";
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import SettingsScreen from "./src/screens/pages/SettingsScreen";
import 'react-native-gesture-handler';
import NewsDetail from "./src/screens/pages/NewsDetail";
import {StyleSheet, View} from "react-native";
const Stack = createStackNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import SourceNews from "./src/screens/sources/SourceNews";

export default function App() {
    return (
        <View style={{flex:1}} >
            <View style={styles.header}>
                <Ionicons name={"notifications"} size={24} color="black" />
                <Ionicons name={"settings"} size={24} color="black" />
            </View>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="News"
                        component={HomeTabs}
                    />
                    <Stack.Screen name="Setting" component={SettingsScreen}/>
                    <Stack.Screen name="NewsDetail" component={NewsDetail}/>
                    <Stack.Screen name="SourceNews" component={SourceNews}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>

    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 30,
    }
});
