import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Pressable,
    GestureResponderEvent, TouchableWithoutFeedback, TouchableOpacity, Text,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

interface DetailsCardProps {
    title: string;
    description: string;
    author: string;
    source: string;
    publishedAt: string;
    urlToImage: string;
    defaultImg: string;
    histories:string;
    onPress: () => void;

}

export const DetailsCard: React.FC<DetailsCardProps> = React.memo(
    (props) => {
        
        return (
            
                <Card containerStyle = {{borderRadius: 10}}>
                    <View
                        style={styles.container}
                    >
                        <Text style={styles.titleStyle}>{props.title}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <Image
                        style={styles.image}
                        source={{uri: props.urlToImage || props.defaultImg}}
                    />


                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

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
           
        );
    },
    () => true,
);
