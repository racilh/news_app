import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View,} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Card, Divider} from "react-native-elements";
import {styles} from "../utils/style"
import {bookmarkStore} from "../mobx/store";

interface NewsCardProps {
    title: string;
    description: string;
    author: string;
    source: string;
    publishedAt: string;
    image: string;
    defaultImg: string;
    url:string;
    onPress: () => void;
    saveBookmarks: () => void;
    removeBookMark: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = React.memo(
    (props: NewsCardProps) => {
        let store = bookmarkStore;
        return (
            <Pressable onPress={props.onPress}>
                <Card  containerStyle ={store.theme ? styles.lightCard : styles.darkCard} >
                    <View
                        style={styles.container}
                    >
                        { (!bookmarkStore.bookmarkExists(props))

                            ? <TouchableOpacity onPress={() => props.saveBookmarks(props)}>
                                <Ionicons name="bookmarks-outline" size={20} color={store.theme ? "black" : "white"}/>
                            </TouchableOpacity>

                            : <TouchableOpacity onPress={() => props.removeBookMark(props.title)}>
                                <Ionicons name="bookmarks-outline" size={20} color={"red"}/>
                            </TouchableOpacity>
                        }




                    <Text style={store.theme ? styles.lightTitleStyle : styles.darkTitleStyle}>{props.title}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{uri: props.image || props.defaultImg}}
                    />




                    <Text style={store.theme ? styles.lightDescriptionStyle : styles.darkDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>

                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <View
                        style={styles.container}
                    >
                        <Text style={ store.theme ? styles.lightNoteStyle :styles.darkNoteStyle}>{props.source.name.toUpperCase()}</Text>
                        <Text style={ store.theme ? styles.lightNoteStyle :styles.darkNoteStyle}>{props.publishedAt}</Text>

                    </View>
                </Card>
            </Pressable>
        );
    },
    () => false,
);
