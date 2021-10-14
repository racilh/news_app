import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from "./src/screens/pages/HomeTab";
import React from 'react';
import {NavigationContainer,DefaultTheme,DarkTheme} from "@react-navigation/native";
import SettingsScreen from "./src/screens/pages/SettingsScreen";
import 'react-native-gesture-handler';
import NewsDetail from "./src/screens/pages/NewsDetail";
const Stack = createStackNavigator();
import SourceNews from "./src/screens/sources/SourceNews";
import {Provider, useSelector} from "react-redux";
import {createStore,combineReducers} from "redux";
import {reducer} from "./src/state/reducer";
import {themeReducer} from "./src/state/themeReducer";
import {styles} from "./src/utils/style";


const rooReducer = combineReducers({
    myDarMode:themeReducer//false
})
const store = createStore(rooReducer)

export default ()=>{
    return(
        <Provider store={store}>
            <Navigation />
        </Provider>
    )

}

function Navigation() {

    let currentTheme = useSelector(state=>{
        return state.myDarMode
    })

    return (

            <NavigationContainer theme={currentTheme ? styles.customDarkTheme : styles.customDefaultTheme}>
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