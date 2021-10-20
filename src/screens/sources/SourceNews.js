import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView,} from 'react-native';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from "@react-navigation/native";
import {NewsCard} from "../../components/NewsCard";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";
import axios from "axios";

/**
 * Function to get articles from an api that belong to the source picked in {Sources.js} component
 * @return {{refreshing: boolean, articles: []}}
 */
const getSources = () => {
    /**
     *  {useRoute} hook which gives access to route object {params} passed from {Sources.js} components
     */
    const {params}: any = useRoute();
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const getParams = {
        sources: params?.id,
        apiKey :"5b0be3a6270b4ddb87c1b0a789290970"
    };
    /**
     * {useEffect} used to fetch the data from the api where {sources=${params?.id}} in {@link params}
     * updating the state of {@link articles} and {@link refreshing}
     */
    useEffect(() => {
        setRefreshing(true);
        axios.get(`https://newsapi.org/v2/top-headlines`,{params: getParams})
            .then((res) => res.data)
            .then((json) => {
                (json.status === "error")
                    ? setArticles([])
                    : setArticles(json.articles);

                setRefreshing(false);
            }).catch(console.error);
    }, []);

    return {
        articles,
        refreshing,
    };
};

/**
 * Component that renders the data returned from {@link getSources} and displays it on the screen
 * @return {JSX.Element}
 */
function SourceNews() {
    const {articles, refreshing} = getSources();
    const [value, setValue] = useState();
    const store = bookmarkStore;
    const navigation = useNavigation();

    /**
     * Function to save an article in bookmark using the action {@link addBookmark} of MobX store {@link bookmarkStore}
     * @param item
     **/
    const saveBookmarks = (item) => {
        store.addBookmark(item);
        store.isBookmarked = true;
        refresh();
    }
    /**
     * Function to remove an article from bookmark using the action {@link removeBookmark} of MobX store {@link bookmarkStore}
     * @param article
     */
    const removeBookMark = (article) => {
        store.removeBookmark(article);
        store.isBookmarked = false;
        refresh();

    }
    /**
     * Function to refresh the component
     */
    const refresh = () => {setValue({}); }

    /**
     * Navigate and pass data to {@link NewsDetail} screen {@link onPress}
     * @param item
     */
    const onPress = (item) => {

        navigation.navigate('NewsDetail', {
            ...item,
        })
    };
    /**
     * Render a {@link Flatlist} with data fetched from news_api {@link articles}
     */
    return (
        <SafeAreaView>
            <FlatList
                data={articles}
                keyExtractor={item => item.url}
                renderItem={({item}) => (
                    <NewsCard
                        {...item}
                        onPress={() => onPress(item)}
                        saveBookmarks={() => saveBookmarks(item)}
                        removeBookMark={() => removeBookMark(item)}
                    />
                )}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link SourceNews} into a reactive components using {@link observer}
 */
export default observer(SourceNews);
