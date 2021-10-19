import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";
import {bookmarkStore} from "../mobx/store";



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
        let store = bookmarkStore;
        const navigation = useNavigation();
           
        return (
            <Pressable onPress={() => navigation.navigate('SourceNews',{
                ...props,
            })}>
                <Card containerStyle ={ store.theme ? styles.lightCard : styles.darkCard}>
                    <View
                        style={styles.container}
                    >
                        <Text style={ store.theme ? styles.lightTitleStyle : styles.darkTitleStyle}>{props.name}</Text>

                    </View>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <Text style={ store.theme ? styles.lightDescriptionStyle : styles.darkDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <View
                        style={styles.container}
                    >
                        <Text style={  store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>{props.language}</Text>
                        <Text style={ store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>{props.category}</Text>
                    </View>
                </Card>
            </Pressable>
        );
    },
    () => false,
);
