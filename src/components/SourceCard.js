import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";
import {useSelector} from "react-redux";


interface SourceCardProps {
    name: string;
    description:string;
    language:string;
    category:string;
    histories:string;
    onPress: () => void;
}

export const SourceCard: React.FC<SourceCardProps> = React.memo(
    (props) => {
        const navigation = useNavigation();
        let currentTheme = useSelector(state=>{
            return state.myDarMode
        })
        return (
            <Pressable onPress={() => navigation.navigate('SourceNews',{
                ...props,
            })}>
                <Card containerStyle ={currentTheme ? styles.darkCard :styles.lightCard}>
                    <View
                        style={styles.container}
                    >
                        <Text style={currentTheme ? styles.darkTitleStyle :styles.lightTitleStyle}>{props.name}</Text>

                    </View>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <Text style={currentTheme ? styles.darkDescriptionStyle :styles.lightDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <View
                        style={styles.container}
                    >
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>{props.language}</Text>
                        <Text style={currentTheme ? styles.darkNoteStyle :styles.lightNoteStyle}>{props.category}</Text>
                    </View>
                </Card>
            </Pressable>
        );
    },
    () => true,
);
