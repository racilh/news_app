import React from 'react';
import {
    View,
    Image,
    Pressable,
Text} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../utils/style";


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


        return (
            <Pressable onPress={() => navigation.navigate('NewsDetail', {
                ...props,
            })}>
                <Card containerStyle = {{borderRadius: 10}}>
                    <View
                        style={styles.container}
                    >
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


                        <Text style={styles.noteStyle}>Viewed at: {props.histories}</Text>


                </Card>
            </Pressable>
        );
    },
    () => true,
);
