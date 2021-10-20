import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    lightSwitchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:"white"
    },
    darkSwitchContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:"black"
    },

    darkDescriptionStyle: {
        margin: 20,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
    lightDescriptionStyle: {
        margin: 20,
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 15,
    },
    darkTitleStyle: {
        fontSize: 20,
        color:"white",

    },
    lightTitleStyle: {
        fontSize: 20,
        color:"black",

    },
    image: {
        height: 150,
        width: "100%",
        justifyContent: "flex-start",
        margin: 5,
        borderRadius: 5
    },

    darkNoteStyle:{
        color:"white",
        margin: 10,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'right',
    },
    lightNoteStyle:{
        color:"black",
        margin: 10,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'right',
    },
    darkCard:{
        borderRadius: 10,
        backgroundColor:'black',
    },
    lightCard:{
        borderRadius: 10,
        backgroundColor:'white',
    },
    darkIcon:{

        color:"white"
    },
    lightIcon:{

        color:"black"
    },
    customDefaultTheme:{
        ...DefaultTheme,
        colors:{
            ...DefaultTheme.colors,
            headerColor:"white",
            tabIcon:"red",
            textColor:"black",
            backgroundColor:"white"
        }
    },
     customDarkTheme:{
        ...DarkTheme,
        colors:{
            ...DarkTheme.colors,
            headerColor:"#404040",
            iconColor:"white",
            tabIcon:"white",
            textColor:"white"
        }
    },
    tab: {
        position: 'absolute',
        bottom: 0,
        height: 68,
        width: 68,
        borderRadius: 68,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switch:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};