/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
    PaperProvider
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import currency from 'currency.js';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    ),
    snackBarToast: ({ text1, props}) => (
        <View style={{
            paddingHorizontal: 16, 
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3
            }}>
            <View style={{  
                height: 60, width: '100%', backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, 
                borderRadius: 8 }}>
                <Text style={{ color: '#222' }}>{text1}</Text>
                <Text onPress={props.onPress} style={{color: 'red'}}>{props.onPressText}</Text>
            </View>
        </View>
    )
}

const Main = () => {
    return (
        <PaperProvider>
            <GestureHandlerRootView>
                <App />
            </GestureHandlerRootView>
            <Toast config={toastConfig} visibilityTime={1000}/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
