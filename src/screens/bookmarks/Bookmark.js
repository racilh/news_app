import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {Card, Divider} from "react-native-elements";
import {styles} from "../../utils/style";

const getData = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        retrieveData().catch(console.error)
    }, [data]);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('bookmarks');
            const value = JSON.parse(valueString);
                setData(Object.values(value ?? []));

        } catch (error) {
            console.error(error);
        }
    };
    return {
        data,
    };
}

function Bookmark() {
    const {data} = getData();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
       setRefreshing(true)
    }, []);

    function sortData() {
        let sortedArray = [];

        // If the item contains "first" property, it will be placed at the beginning of the sortedArray, else it will be at the end of it
        data.forEach(bookmark => (
            bookmark.histories
                ? sortedArray = [bookmark, ...sortedArray]
                : sortedArray.push(bookmark)
        ));

        return sortedArray;
    }
    return (
        <SafeAreaView>
            <FlatList
                data={sortData()}
                keyExtractor={item => item?.url}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NewsDetail', {
                            ...item,
                        })}
                    >
                        <Card style={styles.cardContainer}>
                            <View style={styles.container}>
                                <Text style={styles.titleStyle}>{item?.title}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#dfe6e9'}}/>
                            <Image
                                style={styles.image}
                                source={{uri: item?.urlToImage || item?.defaultImg}}
                            />


                            <Divider style={{backgroundColor: '#dfe6e9'}}/>

                            <Text style={styles.descriptionStyle}>
                                {item?.description || 'Read More..'}
                            </Text>

                            <Divider style={{backgroundColor: '#dfe6e9'}}/>

                            <View
                                style={styles.container}
                            >
                                <Text style={styles.noteStyle}>{item?.source?.name.toUpperCase()}</Text>
                                <Text style={styles.noteStyle}>{item?.histories}</Text>

                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

export default Bookmark;