import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {GeneralCard} from "../../components/Card";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";

/**
 * Component that renders the articles saved in {@link history} and displays it on the screen
 * @return {JSX.Element}
 */
function Seen() {
    const [refreshing, setRefreshing] = useState(false);
    let store = bookmarkStore;
    const [value, setValue] = useState();

    /**
     * Function to refresh the component
     */
    const refresh = () => {
        setValue({});
    }

    /**
     * {@link useEffect} used to load history when rendering the screen and re-run the effect when the values within the array {@link store.history} change across re-renders
     */
    useEffect(() => {
        setRefreshing(true)
        loadSeen()
        refresh()
    }, [store.history]);

    /**
     * Function to get {[]} of {@link _history} saved in {@link bookmarkStore} using computed function {@link history}
     */
    function loadSeen() {
        store.history;
        setRefreshing(true);
    }

    function sortData() {
        let sortedArray = [];

        store.history.forEach(history => (sortedArray.push(history)));

        return sortedArray;
    }

    /**
     * Render a {@link Flatlist} with the saved history {@link store.history}
     */
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

/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link Seen} into a reactive components using {@link observer}
 */
export default observer(Seen);