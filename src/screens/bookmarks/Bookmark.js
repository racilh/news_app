import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {GeneralCard} from "../../components/Card";

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

    useEffect(() => {
        setRefreshing(true)
    }, [data]);

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
                    <GeneralCard {...item}/>
                )}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

export default Bookmark;