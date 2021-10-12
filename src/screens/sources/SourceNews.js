import React, {useEffect, useState} from 'react';
import {
    FlatList, Image,
    SafeAreaView,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';
import {Card, Divider} from "react-native-elements";
import 'react-native-gesture-handler';
import {useNavigation, useRoute} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../../utils/style";

const getSources = () => {
    const { params }: any = useRoute();
    const [articles, setArticles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderBookMark = (bookmarks, item) => {
        item.bookmark = !!bookmarks[params?.publishedAt];
    };

    useEffect(() => {
        console.log(params?.id);
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/top-headlines?sources=${params?.id}&apiKey=fc6bd78fc42243d5ac51bbec5ee72734`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status === "error") {
                    setArticles([])
                } else {
                    setArticles(json.articles);
                    console.log(json.articles);
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
    },[]);

    return {
        articles,
        refreshing,
    };
};

function SourceNews (){
    const navigation = useNavigation();
    const {articles, refreshing} = getSources();
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
                        onPress={() => navigation.navigate('NewsDetail',{
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
export default SourceNews;
