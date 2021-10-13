import {View,StyleSheet} from "react-native";
import React from 'react';
import News from "./News";
import 'react-native-gesture-handler';

function Headlines() {
    return (
        <View style={styles.container}>

            <News/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    }
});

export default Headlines;