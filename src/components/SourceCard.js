import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";


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
        return (
            <Pressable onPress={() => navigation.navigate('SourceNews',{
                ...props,
            })}>
                <Card containerStyle = {{borderRadius: 10}}>
                    <View
                        style={styles.container}
                    >
                        <Text style={styles.titleStyle}>{props.name}</Text>

                    </View>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <Text style={styles.descriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <View
                        style={styles.container}
                    >
                        <Text style={styles.noteStyle}>{props.language}</Text>
                        <Text style={styles.noteStyle}>{props.category}</Text>
                    </View>
                </Card>
            </Pressable>
        );
    },
    () => true,
);
