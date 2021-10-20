import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView
} from 'react-native';
import 'react-native-gesture-handler';
import {SourceCard} from "../../components/SourceCard";
import axios from "axios";

/**
 * Function to get sources from an api
 * @return {{sources: [], refreshing: boolean}}
 */
const getSources = () => {
    /**
     * {@link useState} to create state variables with a current state {[]} and {false}
     * and a function to update the values of {sources} and {refreshing} using {@link setSources} and {@link setRefreshing}
     */
    const [sources, setSources] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const params = {
        apiKey :"5b0be3a6270b4ddb87c1b0a789290970"
    };
    /**
     * {@link useEffect} used to fetch the data from the api with{@link params} when rendering the screen and updating
     * the state of {@link sources} and {@link refreshing}
     */
    useEffect( () => {
        setRefreshing(true);
        axios.get('https://newsapi.org/v2/top-headlines/sources',{params})
            .then((res) => res.data)
            .then((json) => {
                if (json.status === "error") {
                    setSources([])
                } else {
                    setSources(json.sources);

                }
                setRefreshing(false);
            }).catch(console.error);
    },[]);

    return {
        sources,
        refreshing,
    }
};

/**
 * Component that renders the data returned from {@link getSources} and displays it on the screen
 * @return {JSX.Element}
 */
export default () => {
    const {sources, refreshing} = getSources();

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
                data={sources}
                keyExtractor={item => item.url}
                renderItem={({item}) => (
                    <SourceCard  {...item}/>
                )}
                refreshing={refreshing}/>
        </SafeAreaView>
    );
}

