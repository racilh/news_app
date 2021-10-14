import React from 'react';
import {Button, Image, Pressable, Text, TouchableOpacity, View,} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Card, Divider} from "react-native-elements";
import {styles} from "../utils/style"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

interface NewsCardProps {
    title: string;
    description: string;
    author: string;
    source: string;
    publishedAt: string;
    urlToImage: string;
    defaultImg: string;
    bookmark: boolean;
    onPress: () => void;
    saveBookMark: () => void;
    removeBookMark: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = React.memo(
    (props: NewsCardProps) => {
        let currentTheme = useSelector(state=>{
            return state.myDarMode
        })
        return (
            <Pressable onPress={props.onPress}>
                <Card  containerStyle ={currentTheme ? styles.darkCard :styles.lightCard} >
                    <View
                        style={styles.container}
                    >
                    {
                        (!props.bookmark)
                            ? (
                                <TouchableOpacity onPress={() => props.saveBookMark(props)}>
                                    <Ionicons name="bookmarks-outline" size={20} color={currentTheme ? "white" : "black"}/>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => props.removeBookMark(props)}>
                                    <Ionicons name="bookmarks-outline" size={20} color="red"/>
                                </TouchableOpacity>
                            )
                    }
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
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>{props.source.name.toUpperCase()}</Text>
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>{props.publishedAt}</Text>

                    </View>
                </Card>
            </Pressable>
        );
    },
    () => false,
);
