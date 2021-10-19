import React from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import {Card, Divider} from "react-native-elements";
import {styles} from "../utils/style";
import {bookmarkStore} from "../mobx/store";


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
        let store = bookmarkStore;
        return (
            
                <Card containerStyle ={store.theme ? styles.lightCard : styles.darkCard}>
                    <View
                        style={styles.container}
                    >
                        <Text style={ store.theme ? styles.lightTitleStyle : styles.darkTitleStyle}>{props.title}</Text>
                    </View>
                    <Divider style={{backgroundColor: '#dfe6e9'}}/>
                    <Image
                        style={styles.image}
                        source={{uri: props.urlToImage || props.defaultImg}}
                    />


                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <Text style={ store.theme ? styles.lightDescriptionStyle : styles.darkDescriptionStyle}>
                        {props.description || 'Read More..'}
                    </Text>

                    <Divider style={{backgroundColor: '#dfe6e9'}}/>

                    <View
                        style={styles.container}
                    >
                        <Text style={store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>{props.source.name.toUpperCase()}</Text>
                        <Text style={ store.theme ? styles.lightNoteStyle : styles.darkNoteStyle}>{props.publishedAt}</Text>

                    </View>
                </Card>
           
        );
    },
    () => false,
);
