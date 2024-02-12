import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { enableReactNativeComponents } from "@legendapp/state/config/enableReactNativeComponents";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { configureObservablePersistence } from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync()

enableReactNativeComponents()
enableReactTracking({
    auto:true
})

configureObservablePersistence({
    pluginLocal:ObservablePersistAsyncStorage,
    localOptions:{
        asyncStorage:{
            AsyncStorage,
        }
    }
})

export default function Layout(){

    const [fontsLoaded,loadingError]=useFonts({
        "Nunito":require("../assets/fonts/nunito.ttf"),
    })

    const onLayoutRootView=useCallback(async()=>{
        if(fontsLoaded||loadingError){
            await SplashScreen.hideAsync()
        }
    },[fontsLoaded,loadingError])

    return <GestureHandlerRootView style={{flex:1}} onLayout={onLayoutRootView}>
        <GluestackUIProvider config={config}>
            <Drawer />
        </GluestackUIProvider>
        </GestureHandlerRootView>
}