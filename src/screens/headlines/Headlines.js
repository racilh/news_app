import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {NewsCard} from "../../components/NewsCard";
import {useNavigation} from "@react-navigation/native";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";

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
                setRefreshing(false);
            }).catch(console.error);
    }, []);

    return {
        articles,
        refreshing,
    };
};

const Headlines = () => {
    const store = bookmarkStore;
    const navigation = useNavigation();
    const {articles, refreshing} = getNews();

    const saveBookmarks = (item) => {
        store.addBookmark(item);
        store.isBookmarked=true;
        refresh();
    }
    const removeBookMark = (article) => {
        store.removeBookmark(article);
        store.isBookmarked=false;
        refresh();

    }
    const [value, setValue] = useState();
    const refresh = () => {
        // re-renders the component
        setValue({});
    }

    const onPress = (item) => {

        navigation.navigate('NewsDetail', {
            ...item,
        })
    };
 return (

        <SafeAreaView>
            <FlatList
                data={articles}
                keyExtractor={item => item.url}
                renderItem={({item,index}) => (
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
export default observer(Headlines);