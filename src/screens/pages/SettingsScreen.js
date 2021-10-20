import React, {useEffect} from "react";
import {Switch, Text, View} from "react-native";
import {bookmarkStore} from "../../mobx/store";
import {styles} from "../../utils/style";
import {observer} from "mobx-react";

/**
 * Component that controls the theme (Dark mode, Light mode) of all components using a {@link Switch}
 * @return {JSX.Element}
 * @constructor
 */
function SettingsScreen() {
    let store = bookmarkStore;


    useEffect(loadTheme, [store.theme]);

    function loadTheme() {
        console.log(store.theme)
    }

    /**
     * Render a {@link Text} that shows the theme chosen
     * {@link Switch} that changes the state of the theme using MobX action {@link changeTheme()} on {@link onValueChange()}
     */
    return (
        <View style={store.theme ? styles.lightSwitchContainer : styles.darkSwitchContainer}>
            <Text style={store.theme ? styles.lightNoteStyle :styles.darkNoteStyle}>{store.theme ? "Light Mode" : "Dark Mode"}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={store.theme ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => store.changeTheme()}
                value={store.theme}
            />
        </View>
    )
}
/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link SettingsScreen} into a reactive components using {@link observer}
 */
export default observer(SettingsScreen)