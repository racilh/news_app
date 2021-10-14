import Headlines from "../headlines/Headlines";
import Sources from "../sources/Sources";
import React from 'react';
import Bookmark from "../bookmarks/Bookmark";
import Seen from "../seen/Seen";
import 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import {createAppContainer } from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {useDispatch, useSelector} from "react-redux";
import SettingsScreen from "./SettingsScreen";
import {styles} from "../../utils/style";
import {View} from "react-native";
import Icon from "react-native-ionicons";




const Tab = createBottomTabNavigator({

    Headlines: {
        screen: Headlines,
        navigationOptions: {
            tabBarLabel: "Headlines",
            tabBarOptions: {
                activeTintColor: "blue",
            },
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="globe"
                        size={24}
                        color={tabInfo.focused ? "blue" : "#8e8e93"}
                    />
                );
            },
        },
    },
    Sources: {
        screen: Sources,
        navigationOptions: {
            tabBarLabel: "Sources",
            tabBarOptions: {
                activeTintColor: "blue",
            },
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="newspaper-outline"
                        size={24}
                        color={tabInfo.focused ? "blue" : "#8e8e93"}
                    />
                );
            },
        },
    },

    Bookmark: {
        screen: Bookmark,
        navigationOptions: {
            tabBarLabel: "Bookmark",
            tabBarOptions: {
                activeTintColor: "blue",
            },
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="bookmarks-outline"
                        size={24}
                        color={tabInfo.focused ? "blue" : "#8e8e93"}
                    />
                );
            },
        },
    },
    Seen: {
        screen: Seen,
        navigationOptions: {
            tabBarLabel: "Seen",
            tabBarOptions: {
                activeTintColor: "blue",
            },
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="eye"
                        size={24}
                        color={tabInfo.focused ? "blue" : "#8e8e93"}
                    />
                );
            },
        },
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: "Settings",
            tabBarOptions: {
                activeTintColor: "blue",
            },
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name="settings"
                        size={24}
                        color={tabInfo.focused ? "blue" : "#8e8e93"}
                    />
                );
            },
        },
    },
});

const Navigator = createAppContainer(Tab);


export default function HomeTab() {
    let currentTheme = useSelector(state=>{
        return state.myDarMode
    })
    console.log(currentTheme)
    return (

        <Navigator theme={currentTheme ? styles.customDarkTheme : styles.customDefaultTheme}>
            <Headlines />
        </Navigator>

    );
}
