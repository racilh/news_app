import React from 'react';
import {
    View,
    Image,
    Pressable,
Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";
import {bookmarkStore} from "../mobx/store";

interface CardProps {
    title: string;
    description: string;
    author: string;
    urlToImage: string;
    publishedAt:string;
    onPress: () => void;

}

export const GeneralCard: React.FC<CardProps> = React.memo(
    (props) => {
        let store = bookmarkStore;
        const navigation = useNavigation();
        

        return (
            <Pressable onPress={() => navigation.navigate('NewsDetail', {
                ...props,
            })}>
                <Card containerStyle = {store.theme ? styles.lightCard : styles.darkCard}>

                    <View
                        style={styles.container}
                    >
                        <Text style={ store.theme ? styles.lightTitleStyle : styles.darkTitleStyle}>{props.title}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{uri: props.urlToImage || props.defaultImg}}
                    />

                    <Text style={store.theme ? styles.lightDescriptionStyle : styles.darkDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>

                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <View
                        style={styles.container}
                    >
                        <Text style={store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>Viewed at: </Text>
                        <Text style={store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>{props.publishedAt}</Text>

                    </View>
                </Card>
            </Pressable>
        );
    },
    () => false,
);
