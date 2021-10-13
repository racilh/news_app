import React, {useEffect, useState} from 'react';
import config from 'react-native-config';
import {
    FlatList,
    SafeAreaView
} from 'react-native';
import 'react-native-gesture-handler';
import {SourceCard} from "../../components/SourceCard";


const getSources = () => {

    const [sources, setSources] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect( () => {
        setRefreshing(true);
        fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=5b0be3a6270b4ddb87c1b0a789290970')
            .then((res) => res.json())
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

