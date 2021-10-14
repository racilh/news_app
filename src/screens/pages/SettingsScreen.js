import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Switch,View,Text} from "react-native";
import {styles} from "../../utils/style";

function SettingsScreen() {
    const dispatch=useDispatch()
    const currentTheme = useSelector(state=>{

        return state.myDarMode
    })
    console.log(currentTheme)

    return (
        <View style={styles.switch}>
            <Text style={currentTheme ? styles.darkDescriptionStyle :styles.lightDescriptionStyle}>
                {currentTheme ? 'Dark Mode' : 'Light Mode'}
            </Text>
        <Switch
            trackColor={{ false: "grey", true: "white" }}
            thumbColor={currentTheme ? "blue" : "yellow"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>dispatch({type:"change_theme",payload:!currentTheme})}
            value={currentTheme}
        />
        </View>
    )
}
export default SettingsScreen;