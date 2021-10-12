import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from 'react';
import {Card, Divider} from "react-native-elements";
import { useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {styles} from "../../utils/style";

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
                    console.log(history);
                    AsyncStorage.setItem('history', JSON.stringify(history))
                    // .then(() => refresh())
                }
            })

    };
    return (
        <Card style={styles.cardContainer}>
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    onPress={() => console.log('Added!')}
                >
                </TouchableOpacity>

                <Text style={styles.titleStyle}>{params?.title}</Text>
            </View>
            <Divider style={{backgroundColor: '#dfe6e9'}}/>
            <Image
                style={styles.image}
                source={{uri: params?.urlToImage }}
            />


            <Divider style={{backgroundColor: '#dfe6e9'}}/>

            <Text style={styles.descriptionStyle}>

                {params?.description}

            </Text>

            <Divider style={{backgroundColor: '#dfe6e9'}}/>

            <View
                style={styles.container}
            >
                <Text style={styles.noteStyle}>{params?.author}</Text>
                <Text style={styles.noteStyle}>{params?.source.name.toUpperCase()}</Text>


            </View>
            <Divider style={{backgroundColor: '#dfe6e9'}}/>

            <View
                style={styles.container}
            >
                <Text style={styles.noteStyle}>{params?.publishedAt}</Text>


            </View>
        </Card>
    );
}

export default NewsDetail;