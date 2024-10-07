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

const Main = () => {
    return (
        <PaperProvider>
            <App />
            <Toast />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
