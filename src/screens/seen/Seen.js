import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GeneralCard} from "../../components/Card";

const getData = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        retrieveData().catch(console.error)
    }, [data]);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('history');
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

function Seen() {
    const {data} = getData();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setRefreshing(true)
    }, [data]);

    function sortData() {
        let sortedArray = [];

        // If the item contains "first" property, it will be placed at the beginning of the sortedArray, else it will be at the end of it
        data.forEach(history => (
            history.histories
                ? sortedArray = [history, ...sortedArray]
                : sortedArray.push(history)
        ));

        return sortedArray;
    }

    return (
        <SafeAreaView>
            <FlatList
                data={sortData()}
                keyExtractor={item => item?.url}
                renderItem={({item}) => (
                    <GeneralCard {...item} />
                )}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

export default Seen;