import React, {useEffect, useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Card, Divider} from "react-native-elements";
import 'react-native-gesture-handler';
import {useNavigation} from "@react-navigation/native";


const getSources = () => {

    const [sources, setSources] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect( () => {
        setRefreshing(true);
        fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=fc6bd78fc42243d5ac51bbec5ee72734')
            .then((res) => res.json())
            .then((json) => {
                if (json.status === "error") {
                    setSources([])
                } else {
                    setSources(json.sources);

                }
                setRefreshing(false);
            }).catch(console.log);
    },[]);

    return {
        sources,
        refreshing,
    }
};

export default () => {
    const navigation = useNavigation();
    const {sources, refreshing} = getSources();

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
                data={sources}
                keyExtractor={item => item.url}
                renderItem={({item}) => (
                    <TouchableOpacity

                        onPress={() => navigation.navigate('SourceNews',{
                            ...item,
                        })}
                    >
                        <Card>
                            <View
                                style={styles.container}
                            >
                                <Text style={styles.titleStyle}>{item.name}</Text>

                            </View>
                            <Divider style={{backgroundColor: '#dfe6e9'}}/>
                            <Text style={styles.descriptionStyle}>
                                {item.description || 'Read More..'}
                            </Text>
                            <Divider style={{backgroundColor: '#dfe6e9'}}/>
                            <View
                                style={styles.container}
                            >
                                <Text style={styles.noteStyle}>{item.language}</Text>
                                <Text style={styles.noteStyle}>{item.category}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                refreshing={refreshing}/>
        </SafeAreaView>
    );
}


const styles = {
    container: {
        flexDirection: 'row',

        margin: 15,
        borderRadius: 50,
    },
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    descriptionStyle: {
        margin: 20,
        fontStyle: 'italic',
        color: 'black',
        fontSize: 15
    },
    titleStyle: {
        marginHorizontal: 5,
        fontSize: 20,
        color:"black",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 150,
        width: "100%",
        justifyContent: "flex-start",
        margin: 5
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        borderRadius: 50,
        overflow: 'hidden',
    },
};