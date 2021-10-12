import Headlines from "../headlines/Headlines";
import Sources from "../sources/Sources";
import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Bookmark from "../bookmarks/Bookmark";
import Seen from "../seen/Seen";
import 'react-native-gesture-handler';
import {StyleSheet, View} from "react-native";
import {StatusBar} from "native-base";

const Tab = createMaterialTopTabNavigator();
function HomeTabs() {
    return (

            <Tab.Navigator initialRouteName="Headlines"
            >
                <Tab.Screen name="Headlines" component={Headlines} />
                <Tab.Screen name="Sources" component={Sources} />
                <Tab.Screen name="Bookmark" component={Bookmark} />
                <Tab.Screen name="Seen" component={Seen} />
            </Tab.Navigator>



    );
  }

  export default HomeTabs;