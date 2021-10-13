import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NewsCard} from "../../components/NewsCard";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
import {styles} from "../../utils/style";

const getNews = () => {
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderBookMark = (bookmarks, item) => {
        item.bookmark = !!bookmarks[item.publishedAt];
    };

    useEffect(() => {
        setRefreshing(true);
        fetch('https://newsapi.org/v2/top-headlines?country=eg&category1="+business+"&category2="+sports&apiKey=5b0be3a6270b4ddb87c1b0a789290970')
            .then((res) => res.json())
            .then((json) => {
                if (json.status === "error") {
                    setArticles([])
                } else {
                    setArticles(json.articles);
                }
                AsyncStorage.getItem('bookmarks')
                    .then(bookmarksObject => {
                        let bookmarks = {}
                        if (bookmarksObject) {
                            bookmarks = JSON.parse(bookmarksObject)
                        }
                        for (let article of articles) {
                            renderBookMark(bookmarks, article)
                        }
                    })
                setRefreshing(false);
            }).catch(console.error);
    }, []);

    return {
        articles,
        refreshing,
    };
};

export default () => {
    const {articles, refreshing} = getNews();
    const [value, setValue] = useState();
    const navigation = useNavigation();
    const refresh = () => {
        // re-renders the component
        setValue({});
    }


    const saveBookMark = item => {
        AsyncStorage.getItem('bookmarks')
            .then(bookmarksObject => {
                let bookmarks = {}
                if (bookmarksObject) {
                    bookmarks = JSON.parse(bookmarksObject)
                }
                item.bookmark = true
                item.histories = moment()
                    .format('YYYY-MM-DD hh:mm:ss a');
                bookmarks[item.publishedAt] = item
                console.log(bookmarks)
                AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
                    .then(() => refresh())
            })

    };

    const removeBookMark = item => {
        AsyncStorage.getItem('bookmarks')
            .then(bookmarksObject => {
                let bookmarks = {}
                if (bookmarksObject) {
                    bookmarks = JSON.parse(bookmarksObject)
                }
                if (bookmarks[item.publishedAt]) {
                    item.bookmark = false
                    item.histories = moment()
                        .format('YYYY-MM-DD hh:mm:ss a');
                    delete bookmarks[item.publishedAt]
                    console.log(bookmarks)
                    AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
                        .then(() => refresh())
                }
                else{
                    console.log("IM HERE")
                }
            })

    };
    const onPress = (item) => {

        navigation.navigate('NewsDetail', {
            ...item,
        })
    };
    return (

        <SafeAreaView >
            <FlatList
                data={articles}
                keyExtractor={item => item.url}
                renderItem={({item}) => (
                    <NewsCard
                        {...item}
                        onPress={() => onPress(item)}
                        bookmark={item.bookmark}
                        saveBookMark={() => saveBookMark(item)}
                        removeBookMark={() => removeBookMark(item)}/>
                )}
                refreshing={refreshing}/>

        </SafeAreaView>

    );
}

