import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View,} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Card, Divider} from "react-native-elements";
import {styles} from "../utils/style"

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
        return (
            <Pressable onPress={props.onPress}>
                <Card containerStyle = {{borderRadius: 10}} >
                    <View
                        style={styles.container}
                    >
                    {
                        (!props.bookmark)
                            ? (
                                <TouchableOpacity onPress={() => props.saveBookMark(props)}>
                                    <Ionicons name="bookmarks-outline" size={20} color="grey"/>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => props.removeBookMark(props)}>
                                    <Ionicons name="bookmarks-outline" size={20} color="red"/>
                                </TouchableOpacity>
                            )
                    }
                    <Text style={styles.titleStyle}>{props.title}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{uri: props.urlToImage || props.defaultImg}}
                    />




                    <Text style={styles.descriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>

                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <View
                        style={styles.container}
                    >
                        <Text style={styles.noteStyle}>{props.source.name.toUpperCase()}</Text>
                        <Text style={styles.noteStyle}>{props.publishedAt}</Text>

                    </View>
                </Card>
            </Pressable>
        );
    },
    () => false,
);
