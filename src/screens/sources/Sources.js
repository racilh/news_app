import {View,StyleSheet} from "react-native";
import React from 'react';
import News from "../headlines/News";
import 'react-native-gesture-handler';
import Source from "./Source";

function Sources() {
    return (
        <View style={styles.container}>
            <Source/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default Sources;