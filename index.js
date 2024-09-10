/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
    MD2DarkTheme,
    MD2LightTheme,
    MD2Theme,
    MD3Theme,
    useTheme,
    adaptNavigationTheme,
    configureFonts,
  } from 'react-native-paper';

const Main = () => {
    return (
        <PaperProvider theme={MD3Theme}>
            <App/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
