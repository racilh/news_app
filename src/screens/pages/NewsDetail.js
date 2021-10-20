import React, {useEffect} from 'react';
import {useRoute} from "@react-navigation/native";
import {DetailsCard} from "../../components/DetailCard";
import {bookmarkStore} from "../../mobx/store";
import {observer} from "mobx-react";

/**
 * Component that renders a card with data of the chosen article
 * @return {JSX.Element}
 */
function NewsDetail() {
    /**
     *  {useRoute} hook which gives access to route object {@link params} passed from other components
     */
    const {params}: any = useRoute();

    /**
     * {@link useEffect} used to save the component in history screen when rendering the screen using action {@link addHistory()} from {@link bookmarkStore}
     */
    useEffect(() => {
        bookmarkStore.addHistory(params);
    }, [])

    /**
     * Render a {@link DetailsCard} of the {@link params} passed from other components
     */
    return (
        <DetailsCard {...params}/>
    );
}

/**
 * Creating a module that exposes assets to other modules using {@link export}
 * Turn component {@link NewsDetail} into a reactive components using {@link observer}
 */
export default observer(NewsDetail);