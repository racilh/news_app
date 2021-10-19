import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {GeneralCard} from "../../components/Card";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";


function Seen() {
    const [refreshing, setRefreshing] = useState(false);
    let store=bookmarkStore;

    useEffect(() => {
        loadSeen()
        setRefreshing(true)
    }, [store.history]);

    function loadSeen() {
        setRefreshing(true);
         store.history;

     }

    function sortData() {
        let sortedArray = [];

        // If the item contains "first" property, it will be placed at the beginning of the sortedArray, else it will be at the end of it
        store.history.forEach(history => (
            history.publishedAt
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

export default observer(Seen);