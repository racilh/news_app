import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Divider} from "react-native-elements";
import 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import {styles} from "../../utils/style";

const getNews = () => {
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderBookMark = (bookmarks, item) => {
        item.bookmark = !!bookmarks[item.publishedAt];
    };

    useEffect(() => {
        setRefreshing(true);
        fetch('https://newsapi.org/v2/top-headlines?country=eg&category1="+business+"&category2="+sports&apiKey=fc6bd78fc42243d5ac51bbec5ee72734')
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
            }).catch(console.log);
    }, []);

    return {
        articles,
        refreshing,
    };
};

export default () => {
    const navigation = useNavigation();
    const {articles, refreshing} = getNews();
    const [value, setValue] = useState();

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
                    console.log(item.bookmark);
                    console.log(bookmarks)
                    AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks))
                        .then(() => refresh())
                }
                else{
                    console.log("IM HERE")
                }
            })

    };
        return (
        <SafeAreaView>
            <FlatList
                data={articles}
                keyExtractor={item => item.url}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NewsDetail', {
                            ...item,
                        })}
                    >
                        <Card style={styles.cardContainer}>
                            <View
                                style={styles.container}
                            >
                                {
                                    (!item.bookmark)
                                        ? (
                                            <TouchableWithoutFeedback
                                                onPress={() => saveBookMark(item)}>
                                                <Ionicons name="bookmarks" size={20} color="grey"/>
                                            </TouchableWithoutFeedback>
                                        )
                                        :
                                        (
                                            <TouchableOpacity onPress={() => removeBookMark(item)}>
                                                <Ionicons name="bookmarks" size={20} color="red"/>
                                            </TouchableOpacity>
                                        )
                                }
                                <Text style={styles.titleStyle}>{item.title}</Text>
                            </View>
                            <Divider style={{backgroundColor: '#dfe6e9'}}/>
                            <Image
                                style={styles.image}
                                source={{uri: item.urlToImage || item.defaultImg}}
                            />


                            <Divider style={{backgroundColor: '#dfe6e9'}}/>

                            <Text style={styles.descriptionStyle}>
                                {item.description || 'Read More..'}
                            </Text>

                            <Divider style={{backgroundColor: '#dfe6e9'}}/>

                            <View
                                style={styles.container}
                            >
                                <Text style={styles.noteStyle}>{item.source.name.toUpperCase()}</Text>
                                <Text style={styles.noteStyle}>{item.publishedAt}</Text>

                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                refreshing={refreshing}/>

        </SafeAreaView>
    );
}

