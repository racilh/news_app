import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
} from 'react-native';
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from "@react-navigation/native";
import {NewsCard} from "../../components/NewsCard";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";

const getSources = () => {
    const { params }: any = useRoute();
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderBookMark = (bookmarks, item) => {
        item.bookmark = !!bookmarks[params?.publishedAt];
    };

    useEffect(() => {
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/top-headlines?sources=${params?.id}&apiKey=5b0be3a6270b4ddb87c1b0a789290970`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status === "error") {
                    setArticles([])
                } else {
                    setArticles(json.articles);

                }
                setRefreshing(false);
            }).catch(console.error);
    },[]);

    return {
        articles,
        refreshing,
    };
};

function SourceNews (){
    const {articles, refreshing} = getSources();
    const [value, setValue] = useState();
    const store = bookmarkStore;
    const navigation = useNavigation();

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
export default observer(SourceNews);
