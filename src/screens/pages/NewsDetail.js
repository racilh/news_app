import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from 'react';
import {Card, Divider} from "react-native-elements";
import { useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {styles} from "../../utils/style";
import {DetailsCard} from "../../components/DetailCard";

function NewsDetail() {
    const { params }: any = useRoute();

    useEffect(() => {
        // write your code here, it's like componentWillMount
        saveHistory(params);
    }, [])

    const saveHistory = item => {
        AsyncStorage.getItem('history')
            .then(historysObject => {
                let history = {}
                if (historysObject) {
                    history = JSON.parse(historysObject)
                }
                if (!history[item.title]) {
                    item.histories = moment()
                        .format('YYYY-MM-DD hh:mm:ss a');
                    history[item.title] = item

                    AsyncStorage.setItem('history', JSON.stringify(history))
                    // .then(() => refresh())
                }
            })

    };
    return (
        <DetailsCard {...params}/>
    );
}

export default NewsDetail;