import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {GeneralCard} from "../../components/Card";
import {observer} from "mobx-react";
import {bookmarkStore} from "../../mobx/store";


function Bookmark() {

    let [refreshing, setRefreshing] = useState(false);
    let store=bookmarkStore;
    const [value, setValue] = useState();
    const refresh = () => {
        // re-renders the component
        setValue({});
    }
    useEffect(() => {
        setRefreshing(true)
        loadBookmarks()
        refresh()
    }, [store.bookmarks]);

     function loadBookmarks() {
         store.bookmarks;
         setRefreshing(true);
    }
    console.log(store.bookmarks);

    function sortData() {
        let sortedArray = [];

        // If the item contains "first" property, it will be placed at the beginning of the sortedArray, else it will be at the end of it
        store.bookmarks.forEach(bookmark => (
            bookmark.url
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

export default observer(Bookmark);