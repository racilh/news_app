import React, {useEffect} from "react";
import {Button, Switch, Text, View} from "react-native";
import {bookmarkStore} from "../../mobx/store";
import {styles} from "../../utils/style";
import {observer} from "mobx-react";


function SettingsScreen() {
    let store = bookmarkStore;

    useEffect(() => {
        loadTheme()
    }, [store.theme]);

    function loadTheme() {
        console.log(store.theme)
    }

    return (
        <View style={store.theme ? styles.lightSwitchContainer : styles.darkSwitchContainer}>
            <Text style={store.theme ? styles.lightNoteStyle :styles.darkNoteStyle}> {store.theme ? "Light Mode" : "Dark Mode"}</Text>
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

export default observer(SettingsScreen)