import Headlines from "../headlines/Headlines";
import Sources from "../sources/Sources";
import React from 'react';
import Bookmark from "../bookmarks/Bookmark";
import Seen from "../seen/Seen";
import 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import SettingsScreen from "./SettingsScreen";


/**
 * Initializing a simple tab bar on the bottom of the screen that lets us switch between different routes
 * @type {import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>}
 */
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

/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Rendering {@link Navigator} in {@link HomeTab} with {@link Headlines} being the root component
 */
export default function HomeTab() {
    return (

        <Navigator>
            <Headlines/>
        </Navigator>

    );
}
