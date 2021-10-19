import React, {useEffect} from 'react';
import { useRoute} from "@react-navigation/native";
import {DetailsCard} from "../../components/DetailCard";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";

function NewsDetail() {
    const { params }: any = useRoute();

    useEffect(() => {
        bookmarkStore.addHistory(params);
    }, [])


    return (
        <DetailsCard {...params}/>
    );
}

export default observer(NewsDetail);