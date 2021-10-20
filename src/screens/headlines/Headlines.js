import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {NewsCard} from "../../components/NewsCard";
import {useNavigation} from "@react-navigation/native";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";
import axios from "axios";

/**
 * Function to get articles from an api
 * @return {{refreshing: boolean, articles: []}}
 */
const getNews = () => {
    /**
     * {useState} to create state variables with a current state {[]} and {false}
     * and a function to update the values of {articles} and {refreshing} using {setArticles} and {setRefreshing}
     */
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const params = {
        country: "eg",
        category1:"business",
        category2: "sports",
        apiKey :"5b0be3a6270b4ddb87c1b0a789290970"
    };
    /**
     * {@link useEffect} used to fetch the data from the api with {@link params} when rendering the screen and updating the state of {articles} and {refreshing}
     */
    useEffect(() => {
        setRefreshing(true)

        axios.get('https://newsapi.org/v2/top-headlines', {params})
            .then((res) => res.data)
            .then((json) => {
                setArticles(json.status === "error" ? [] : json.articles)
                setRefreshing(false);
            }).catch(console.error);
    }, []);

    return {
        articles,
        refreshing,
    };
};

/**
 * Component that renders the data returned from {@link getNews} and displays it on the screen
 * @return {JSX.Element}
 */
const Headlines = () => {
    const store = bookmarkStore;
    const navigation = useNavigation();
    const {articles, refreshing} = getNews();
    const [value, setValue] = useState();

    /**
     * Function to save an article in bookmark using the action {@link addBookmark} of MobX store {@link bookmarkStore}
     * @param item
     */
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
     * Function to refresh the screen
     */
    const refresh = () => {
        // re-renders the component
        setValue({});
    }

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
};
/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link Headlines} into a reactive components using {@link observer}
 */
export default observer(Headlines);