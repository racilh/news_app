import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {GeneralCard} from "../../components/Card";
import {observer} from "mobx-react";
import {bookmarkStore} from "../../mobx/store";

/**
 * Component that renders the articles saved in {bookmark} and displays it on the screen
 * @return {JSX.Element}
 */
function Bookmark() {
    let [refreshing, setRefreshing] = useState(false);
    let store = bookmarkStore;
    const [value, setValue] = useState();
    console.log(store.theme)
    /**
     * Function to refresh the component
     */
    const refresh = () => {
        setValue({});
    }

    /**
     * {useEffect} used to load bookmarks when rendering the screen and re-run the effect when the values within the array {store.bookmarks} change across re-renders
     */
    useEffect(() => {
        setRefreshing(true)
        loadBookmarks()
        refresh()
    }, []);

    /**
     * Function to get {[]} of bookmarks saved in {bookmarkStore} using computed function {bookmarks}
     */
    function loadBookmarks() {
        store.bookmarks;
        setRefreshing(true);
    }

    function sortData() {
        let sortedArray = [];
        store.bookmarks.forEach(bookmark => (sortedArray.push(bookmark)));
        return sortedArray;
    }

    /**
     * Render a {@link Flatlist} with the bookmarks
     */
    return (
        <SafeAreaView>
            <FlatList
                data={sortData()}
                keyExtractor={item => item?.url}
                renderItem={({item}) => (
                    <GeneralCard {...item}/>)}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link Bookmark} into a reactive components using {@link observer}
 */
export default observer(Bookmark);