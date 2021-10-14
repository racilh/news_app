import React from 'react';
import {
    View,
    Image,
    Pressable,
Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";
import {useSelector} from "react-redux";

interface CardProps {
    title: string;
    description: string;
    author: string;
    urlToImage: string;
    histories:string;
    onPress: () => void;

}

export const GeneralCard: React.FC<CardProps> = React.memo(
    (props) => {
        const navigation = useNavigation();
        let currentTheme = useSelector(state=>{
            return state.myDarMode
        })

        return (
            <Pressable onPress={() => navigation.navigate('NewsDetail', {
                ...props,
            })}>
                <Card containerStyle = {currentTheme ? styles.darkCard :styles.lightCard}>

                    <View
                        style={styles.container}
                    >
                        <Text style={currentTheme ? styles.darkTitleStyle :styles.lightTitleStyle}>{props.title}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{uri: props.urlToImage || props.defaultImg}}
                    />

                    <Text style={currentTheme ? styles.darkDescriptionStyle :styles.lightDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>

                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <View
                        style={styles.container}
                    >
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>Viewed at: </Text>
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>{props.histories}</Text>

                    </View>
                </Card>
            </Pressable>
        );
    },
    () => true,
);
